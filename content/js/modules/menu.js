/* ==========================================================================
  Mono menus JS 0.2
  * 0.2 "TB version"
    * (Erik Gelderblom)
  * 0.1 "NGD version"
    * Initial version (Simon Wuyts)
   ========================================================================== */

import { createPopper, preventOverflow } from '@popperjs/core';
import { isClickOutside } from './util';

/* Menu JS
   ========================================================================== */

// Collect all triggers on the page except for the sidebar
const menuTriggers = document.querySelectorAll(
  '[data-menu]:not(.js-no-action)'
);

const selectOptions = document.querySelectorAll('[role="option"]');

// Global settings
const menuActiveClass = 'c-menu--visible';
const dropdownMargin = 8;

let popperInstances = [];

// Find target dropdown element
const findDropdown = (triggerEl) => {
  const targetId = triggerEl.getAttribute('data-menu');
  return document.getElementById(targetId);
};

// find Select for clicked option
const findSelect = (element) => {
  return document.querySelector(`[data-menu="${element.parentElement.id}`);
};

// Position dropdown
function create(triggerEl, targetEl) {
  const placement = triggerEl.dataset.menuPlacement || 'bottom-start';
  const samewidthEnable = !!triggerEl.dataset.menuSamewidth || false;
  const offset = triggerEl.dataset.menuOffset || dropdownMargin;

  let popperInstance = new createPopper(triggerEl, targetEl, {
    placement,
    modifiers: [
      preventOverflow,
      {
        name: 'offset',
        options: {
          offset: [0, offset],
        },
      },
      {
        name: 'sameWidth',
        enabled: samewidthEnable,
        phase: 'beforeWrite',
        requires: ['computeStyles'],
        fn: ({ state }) => {
          state.styles.popper.width = `${state.rects.reference.width}px`;
        },
        effect: ({ state }) => {
          state.elements.popper.style.width = `${state.elements.reference.offsetWidth}px`;
        },
      },
    ],
  });

  popperInstances.push(popperInstance);
}

function showPopper(trigger, targetEl) {
  create(trigger, targetEl);
  targetEl.setAttribute('data-show', '');
  targetEl.classList.add(menuActiveClass);
}

function hidePopper(instance) {
  const popper = instance.state.elements.popper;
  popper.removeAttribute('data-show');
  popper.classList.remove(menuActiveClass);

  destroy(instance);
}

function destroy(target) {
  const instance = popperInstances.find((instance) => instance === target);
  if (instance) {
    instance.destroy();
    popperInstances.splice(popperInstances.indexOf(target), 1);
  }
}

const findPopperInstance = (target) =>
  popperInstances.find(
    (instance) =>
      instance.state.elements.popper === document.getElementById(target)
  );

// Add or remove classes on clicking a trigger
const handleClick = (event) => {
  event.stopPropagation();

  const trigger = event.currentTarget;
  const targetEl = findDropdown(trigger);
  const instance = findPopperInstance(targetEl.id);

  if (!instance) {
    showPopper(trigger, targetEl);
  } else {
    hidePopper(instance);
  }
};

// Hide all menus when clicking outside
const handleOutsideClick = (event) => {
  if (!popperInstances.length) return;

  event.stopImmediatePropagation();

  const poppers = popperInstances.map(
    (instance) => instance.state.elements.popper
  );

  if (isClickOutside(event, [...poppers]))
    [...popperInstances].map((instance) => {
      hidePopper(instance);
    });
};

// Loop through all triggers on the page
// Attach event listeners
menuTriggers.forEach((trigger) =>
  trigger.addEventListener('click', handleClick)
);

// Custom select code
// Attach event listeners
selectOptions.forEach((option) =>
  option.addEventListener('click', handleSelectClick)
);

// Add click listener on outside
document.addEventListener('click', handleOutsideClick);

export { findDropdown, findSelect };

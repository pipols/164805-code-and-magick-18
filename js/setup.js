'use strict';
var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = document.querySelector('.setup-close');
var setupOpenIcon = document.querySelector('.setup-open-icon');
var setupUserName = document.querySelector('.setup-user-name');

document.querySelector('.setup-similar').classList.remove('hidden');

var USER_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var USER_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var USER_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var COLOR_OF_EYES_USERS = ['black', 'red', 'blue', 'yellow', 'green'];
var AMOUNT_WIZARDS = 4;
var KeyCode = {
  ESC: 27,
  ENTER: 13
};

var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;
var similarList = document.querySelector('.setup-similar-list');

var getRandomInteger = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomArrayElement = function (elements) {
  return elements[getRandomInteger(0, elements.length - 1)];
};

var generateWizardsArray = function (amountWizards) {
  var wizards = [];
  for (var i = 0; i < amountWizards; i++) {
    wizards.push({
      name: getRandomArrayElement(USER_NAMES) + ' ' + getRandomArrayElement(USER_SURNAMES),
      coatColor: getRandomArrayElement(USER_COLORS),
      eyesColor: getRandomArrayElement(COLOR_OF_EYES_USERS)
    });
  }
  return wizards;
};

var wizards = generateWizardsArray(AMOUNT_WIZARDS);

var getWizardNode = function (template, wizard) {
  var newNode = template.cloneNode(true);
  newNode.querySelector('.setup-similar-label').textContent = wizard.name;
  newNode.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  newNode.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return newNode;
};

var accumulateNode = function (amount) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < amount; i++) {
    var newNode = getWizardNode(similarWizardTemplate, wizards[i]);
    fragment.appendChild(newNode);
  }
  return fragment;
};

similarList.appendChild(accumulateNode(AMOUNT_WIZARDS));

setupOpenIcon.tabIndex = 0;
setupClose.tabIndex = 0;

var openSetup = function () {
  setup.classList.remove('hidden');
  setupClose.addEventListener('keydown', setupCloseKeydownHandler);
  document.addEventListener('keydown', documentKeydownHandler);
};

var closeSetup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', documentKeydownHandler);
};

var documentKeydownHandler = function (evt) {
  if (!(document.activeElement === setupUserName) && evt.keyCode === KeyCode.ESC) {
    closeSetup();
  }
};

var setupCloseKeydownHandler = function (evt) {
  if (evt.keyCode === KeyCode.ENTER) {
    closeSetup();
  }
};

var setupOpenKeydownHandler = function (evt) {
  if (evt.keyCode === KeyCode.ENTER) {
    openSetup();
  }
};

setupOpen.addEventListener('click', function () {
  openSetup();
});

setupOpenIcon.addEventListener('keydown', setupOpenKeydownHandler);

setupClose.addEventListener('click', function () {
  closeSetup();
});

setupUserName.minLength = 2;
setupUserName.maxLength = 25;

var setupWizard = document.querySelector('.setup-wizard');
var wizardCoat = setupWizard.querySelector('.wizard-coat');
var wizardEyes = setupWizard.querySelector('.wizard-eyes');
var wizardFireball = document.querySelector('.setup-fireball-wrap');

var setupForm = document.querySelector('.setup-wizard-form');
var inputFireballColor = setupForm.querySelector('[name="fireball-color"]');
var inputCoatColor = setupForm.querySelector('[name="coat-color"]');
var inputEyesColor = setupForm.querySelector('[name="eyes-color"]');


var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARD_FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

wizardCoat.addEventListener('click', function () {
  var coatColor = getRandomArrayElement(WIZARD_COAT_COLORS);
  wizardCoat.style.fill = coatColor;
  inputCoatColor.value = coatColor;
});

wizardEyes.addEventListener('click', function () {
  var eyesColor = getRandomArrayElement(WIZARD_EYES);
  wizardEyes.style.fill = eyesColor;
  inputEyesColor.value = eyesColor;
});

wizardFireball.addEventListener('click', function () {
  var fireballColor = getRandomArrayElement(WIZARD_FIREBALL_COLORS);
  wizardFireball.style.backgroundColor = fireballColor;
  inputFireballColor.value = fireballColor;
});

setupForm.action = 'https://js.dump.academy/code-and-magick';

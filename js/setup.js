'use strict';

document.querySelector('.setup').classList.remove('hidden');
document.querySelector('.setup-similar').classList.remove('hidden');

var USER_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var USER_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var USER_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var COLOR_OF_EYES_USERS = ['black', 'red', 'blue', 'yellow', 'green'];
var AMOUNT_WIZARDS = 4;

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

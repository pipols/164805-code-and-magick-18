'use strict';

document.querySelector('.setup').classList.remove('hidden');
document.querySelector('.setup-similar').classList.remove('hidden');

var USER_NAME = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var USER_SURNAME = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var USER_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var USER_EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
var amountWizards = 4;

var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;
var similarList = document.querySelector('.setup-similar-list');

var randomInteger = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomArrayElement = function (mass) {
  return mass[randomInteger(0, mass.length - 1)];
};

var generateWizardsArray = function (amount) {
  var newArr = [];
  for (var i = 0; i < amount; i += 1) {
    newArr[i] = {
      name: getRandomArrayElement(USER_NAME) + ' ' + getRandomArrayElement(USER_SURNAME),
      coatColor: getRandomArrayElement(USER_COLOR),
      eyesColor: getRandomArrayElement(USER_EYES_COLOR)
    };
  }
  return newArr;
};

var wizards = generateWizardsArray(amountWizards);

var getWizardNode = function (template, obj) {
  var newNode = template.cloneNode(true);
  newNode.querySelector('.setup-similar-label').textContent = obj.name;
  newNode.querySelector('.wizard-coat').style.fill = obj.coatColor;
  newNode.querySelector('.wizard-eyes').style.fill = obj.eyesColor;
  return newNode;
};

var accumulateNode = function (amount) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < amount; i += 1) {
    var newNode = getWizardNode(similarWizardTemplate, wizards[i]);
    fragment.appendChild(newNode);
  }
  return fragment;
};

similarList.appendChild(accumulateNode(amountWizards));

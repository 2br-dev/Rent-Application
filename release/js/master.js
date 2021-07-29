"use strict";

var tabs, sidenav, datepicker, select, yearAutocomplete, modal, detailsSidenav;
$(function () {
  $('body').on('click', '.toggle-search', toggleSearch);
  $('body').on('keydown', '.editable', setEditable);
  $('body').on('click', '.restore', restoreEditable);
  $('body').on('click', '.arenda-row', toggleDetails);
  $('body').on('click', '.details-trigger', toggleDetailsSection);
  $('body').on('click', '.address-trigger', openAddress);
  $('body').on('click', '.toast-close', closeToast);
  init();
}); //= Инициализация ==================================================================================================

function init() {
  tabs = M.Tabs.init(document.querySelector('.tabs'));
  sidenav = M.Sidenav.init(document.querySelector('.sidenav#mobile-menu'));
  detailsSidenav = M.Sidenav.init(document.querySelector('.sidenav#details'), {
    edge: 'right'
  });
  datepicker = M.Datepicker.init(document.querySelectorAll('.datepicker'), {
    firstDay: 1,
    container: 'body',
    format: 'dd mmmm yyyy',
    i18n: {
      'months': ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
      monthsShort: ['Янв', 'Фев', 'Мрт', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
      weekdays: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
      weekdaysShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
      weekdaysAbbrev: ['В', 'П', 'В', 'С', 'Ч', 'П', 'С']
    }
  });
  modal = M.Modal.init(document.querySelectorAll('.modal'), {
    onOpenStart: function onOpenStart(modal, link) {
      var header = $(modal).find('h3');
      var headerText = $(link).data('header');

      if (headerText) {
        header.text(headerText);
      }
    }
  });
  select = M.FormSelect.init(document.querySelectorAll('select'), {
    classes: 'select-wrapper-custom'
  });

  if ($('.autocomplete#year').length) {
    yearAutocomplete = M.Autocomplete.init(document.querySelector('.autocomplete#year'), {
      minLength: 0,
      data: {
        "2012": null,
        "2013": null,
        "2014": null,
        "2015": null,
        "2016": null,
        "2017": null,
        "2018": null,
        "2019": null,
        "2020": null,
        "2021": null
      }
    });
  }

  if ($('.autocomplete#payment-type').length) {
    yearAutocomplete = M.Autocomplete.init(document.querySelector('.autocomplete#payment-type'), {
      minLength: 0,
      data: {
        "Отопление": null,
        "Горячая вода": null,
        "Холодная вода": null,
        "Электричество": null,
        "Интернет/Интернет-ТВ": null,
        "Спутниковое ТВ": null,
        "Вывоз мусора": null
      }
    });
  }
} //= Обработчики событий ============================================================================================


function closeToast() {
  var toast = M.Toast.getInstance($(this).parents('.toast').get(0));
  toast.dismiss();
}

function openAddress() {
  var address = $(this).text();
  M.toast({
    html: address + '<a class="btn-flat toast-action toast-close">Закрыть</a>',
    displayLength: Math.infinite
  });
}

function toggleDetailsSection(e) {
  e === null || e === void 0 ? void 0 : e.preventDefault();
  $('.details-trigger').removeClass('active');
  $(this).addClass('active');
}

function toggleDetails(e) {
  e === null || e === void 0 ? void 0 : e.preventDefault();
  $('.arenda-row').removeClass('selected');
  $(this).addClass('selected');
  if ($(window).outerWidth() <= 1200) detailsSidenav.open();
}

function toggleSearch(e) {
  $(this).parents('.h1-wrapper').toggleClass('search-visible');
}

function setEditable(e) {
  var code = e.keyCode;
  console.log(code);

  if (code == 13) {
    e.preventDefault();
    $(this).blur();

    if ($(this).text() != $(this).data('initial-value')) {
      $(this).addClass('modified');
      $(this).parents('tr').find('.restore').removeClass('hidden');
    } else {
      $(this).removeClass('modified');
      $(this).parents('tr').find('.restore').addClass('hidden');
    }

    return false;
  }

  var allowedCodes = [8, 35, 36, 37, 39, 46, 110, 191, 16, 48, 49, 49, 50, 51, 52, 53, 54, 55, 56, 57, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105];
  var allowedIndex = allowedCodes.indexOf(code);

  if (allowedIndex === -1) {
    e.preventDefault();
    return false;
  }

  var val = $(this).text();
  $(this).next().attr('value', val);
}

function restoreEditable(e) {
  e.preventDefault();
  var initialValue = $(this).parents('tr').find('[contenteditable]').data('initial-value');
  $(this).addClass('hidden').parents('tr').find('[contenteditable]').text(initialValue).removeClass('modified');
} //= Общие функции ==================================================================================================
// function tableInit(){
//     $('.responsive-table').each((index, table) => {
//         let columnsArray = [];
//         var columns = $(table).find('th');
//         columns.each((index, column) => {
//             columnsArray.push(column.innerText);
//         });
//         var rows = $(table).find('tbody tr');
//         rows.each((index, row) => {
//             var cells = $(row).find('td');
//             cells.each((index, td) => {
//                 let prefix = columnsArray[index];
//                 let prefixElement = $('<span class="prefix">' + prefix + '</span>');
//                 $(td).prepend(prefixElement);
//             })
//         })
//     })
// }
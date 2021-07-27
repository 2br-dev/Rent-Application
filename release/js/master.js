"use strict";

var tabs, sidenav;
$(function () {
  $('body').on('click', '.toggle-search', toggleSearch);
  $('body').on('keydown', '.editable', setEditable);
  $('body').on('click', '.restore', restoreEditable);
  init();
}); //= Инициализация ==================================================================================================

function init() {
  tabs = M.Tabs.init(document.querySelector('.tabs'));
  sidenav = M.Sidenav.init(document.querySelector('.sidenav'));
} //= Обработчики событий ============================================================================================


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
import { checkbox, input, range, result, tooltip } from './сontrols';
import type { ControlElements } from './types';
import { approval, rateC, rateV, revenueRange } from './var';

const yearDay = 365;
const factor1 = 14;
const factor2 = 2.17;

function convertToRub(n: number): string {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(n);
}

function overPayment(interest: number) {
  const amortization = toltipCalc();

  const resultPercent = (interest / amortization).toFixed(0);
  const resultSum = interest + amortization;
  innerResult(tooltip.tooltipTotal, convertToRub(resultSum));
  innerResult(result.resultPayment, convertToRub(resultSum));
  innerResult(result.resultOverpayment, `${resultPercent}%`);
}
function toltipCalc() {
  const loanAmount = Number(input.loanAmount.value);
  const loanTerm = Number(input.loanTerm.value);
  const result = loanAmount / loanTerm / factor2;
  innerResult(tooltip.tooltipAmortization, convertToRub(result));
  return result;
}

function interestRateCalc(rateC: number, rateV: number[]) {
  const loanAmount = Number(input.loanAmount.value);
  const rateVPercent1 = (rateV[0] / 12).toFixed(1);
  const rateVPercent2 = (rateV[1] / 12).toFixed(1);

  const resultV = `${rateVPercent1}%-${rateVPercent2}%`;

  const resultC = ((loanAmount * rateC) / yearDay) * factor1;

  overPayment(resultC);
  innerResult(result.resultRate, resultV);
  innerResult(tooltip.tooltipInterest, convertToRub(resultC));
}
function innerResult(element: HTMLSpanElement, num: string) {
  element.innerText = num;
}

function geRevenue() {
  const employees = checkbox.numberOfEmployees.checked;
  const revenue = Number(input.averageMonthlyRevenue.value);
  for (let i = 0; i < revenueRange.length; i++) {
    const cell1 = revenueRange[i][0] * 1000000;
    const cell2 = revenueRange[i][1] * 1000000;
    if (revenue > cell1 && revenue < cell2) {
      if (employees) {
        innerResult(result.resultApproval, `${approval[i][1]}%`);
        interestRateCalc(rateC[i][1], rateV[i][1]);
      } else {
        innerResult(result.resultApproval, `${approval[i][0]}%`);
        interestRateCalc(rateC[i][0], rateV[i][0]);
      }
    }
  }
}

const syncValues = (source: HTMLInputElement, target: HTMLInputElement) => {
  if (
    source.value === '' ||
    Number(source.value) < Number(source.min) ||
    Number(source.value) > Number(source.max)
  ) {
    source.classList.add('error');
    if (target.type === 'range') {
      target.style.setProperty('--value', '0');
      target.value = '0';
    }
  } else {
    if (source.classList.contains('error') || target.classList.contains('error')) {
      source.classList.remove('error');
      target.classList.remove('error');
    }
    if (target.type === 'range') {
      target.style.setProperty('--value', source.value);
    }
    target.value = source.value;
  }
};

function inputValue(event: Event) {
  geRevenue();
  toltipCalc();
  const inputElement = event.target as HTMLInputElement;
  if (inputElement !== null) {
    if (inputElement.type === 'range') {
      syncValues(range.loanAmountRange, input.loanAmount);
      syncValues(range.loanTermRange, input.loanTerm);
      syncValues(range.averageMonthlyRevenueRange, input.averageMonthlyRevenue);
    } else if (inputElement.type === 'number' || inputElement.type === 'text') {
      syncValues(input.loanAmount, range.loanAmountRange);
      syncValues(input.loanTerm, range.loanTermRange);
      syncValues(input.averageMonthlyRevenue, range.averageMonthlyRevenueRange);
    } else if (inputElement.type === 'checkbox') {
      console.log(1);
    }
  }
}
const applyEventListeners = (elements: ControlElements, events: string[]) => {
  Object.values(elements).forEach((element) => {
    if (element !== null) {
      events.forEach((event) => {
        element.addEventListener(event, inputValue, false);
      });
    }
  });
};

function applyRangeLineEvent(ranges: ControlElements): void {
  for (const range of Object.values(ranges)) {
    if (range) {
      range.style.setProperty('--value', range.value);
      range.style.setProperty('--min', range.min === '' ? '0' : range.min);
      range.style.setProperty('--max', range.max === '' ? '100' : range.max);
      range.style.setProperty('--value', range.value);

      const updateValue = (event: Event) => {
        range.style.setProperty('--value', range.value);
        inputValue(event);
      };

      range.addEventListener('input', updateValue);
      range.addEventListener('change', updateValue);
    }
  }
}

(function init() {
  geRevenue();
  toltipCalc();
  applyRangeLineEvent(range);
  applyEventListeners(input, ['input', 'focus', 'paste']);
  applyEventListeners(checkbox, ['input', 'change']);
})();

// Default values.
// function setDefault() {
//   input.loanAmount.value = '10000000';
//   input.loanTerm.value = '11';
//   input.averageMonthlyRevenue.value = '5';
// }

// function validator(num: string, min: number, max: number): boolean {
//   const re = /^[0-9\s]*$/;
//   return re.test(num) && Number(num) >= min && Number(num) <= max;
// }

// function focusOff(n: string) {
//   return n.replace(/\s/g, '');
// }

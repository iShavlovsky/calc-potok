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
  }).format(n);
}

function calculateAmortization() {
  const loanAmount = Number(input.loanAmount.value);
  const loanTerm = Number(input.loanTerm.value);
  const amortization = loanAmount / loanTerm / factor2;
  innerResult(tooltip.tooltipAmortization, convertToRub(amortization));
  return amortization;
}

function calculateInterestAndOverPayment() {
  const loanAmount = Number(input.loanAmount.value);
  const [rateCEmployee, rateVRange] = getRateBasedOnRevenue();
  const interest = ((loanAmount * Number(rateCEmployee)) / yearDay) * factor1;
  const amortization = calculateAmortization();
  const overPaymentPercent = (interest / amortization).toFixed(0);
  const totalPayment = interest + amortization;
  updateResults(totalPayment, overPaymentPercent, `${rateVRange}`, interest);
}

function innerResult(element: HTMLSpanElement, num: string) {
  element.innerText = num;
}

function updateResults(
  totalPayment: number,
  overPaymentPercent: string,
  rateVRange: string,
  interest: number,
) {
  innerResult(tooltip.tooltipTotal, convertToRub(totalPayment));
  innerResult(result.resultPayment, convertToRub(totalPayment));
  innerResult(result.resultOverpayment, `${overPaymentPercent}%`);
  innerResult(result.resultRate, rateVRange);
  innerResult(tooltip.tooltipInterest, convertToRub(interest));
}

function getRateBasedOnRevenue() {
  const employees = checkbox.numberOfEmployees.checked;
  const revenue = Number(input.averageMonthlyRevenue.value);

  for (let i = 0; i < revenueRange.length; i++) {
    const [cell1, cell2] = revenueRange[i].map((x) => x * 1000000);
    if (revenue > cell1 && revenue < cell2) {
      const approvalRate = employees ? approval[i][1] : approval[i][0];
      const rateCRes = employees ? rateC[i][1] : rateC[i][0];
      const rateVRes = employees ? rateV[i][1] : rateV[i][0];

      innerResult(result.resultApproval, `${approvalRate}%`);
      return [rateCRes, `${(rateVRes[0] / 12).toFixed(1)}%-${(rateVRes[1] / 12).toFixed(1)}%`];
    }
  }
  return [0, 0];
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
  calculateInterestAndOverPayment();
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
  calculateInterestAndOverPayment();
  applyRangeLineEvent(range);
  applyEventListeners(input, ['input', 'focus', 'paste']);
  applyEventListeners(checkbox, ['input', 'change']);
})();

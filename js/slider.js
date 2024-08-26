const calculator = document.querySelector('.calculator')
const lengthSpans = document.querySelector('#length-spans');
const percentage = document.getElementById('percentage');
const coolingSwitch = document.getElementById('cooling-switch');
const coolingIcon = document.getElementById('cooling-icon');
const stateSelect = document.getElementById('stateSelect');
const savingsTitle = document.getElementById('savings-title');
const savingsFiveYearBar = document.getElementById('savings-five-year');
const savingsTenYearBar = document.getElementById('savings-ten-year');
const savingsFifteenYearBar = document.getElementById('savings-fifteen-year');
const progressBar = document.getElementById('progress-bar');
// Constantes
const BTU_INPUT = 80000; // BTU/hora
const HOURS_PER_YEAR = 8 * 180; // 8 horas/día * 180 días (temporada de calefacción)
// DOM
const costInput = document.getElementById('costPerTherm');
const fiveYearSavingsElement = document.getElementById('fiveYearSavings');
const tenYearSavingsElement = document.getElementById('tenYearSavings');
const fifteenYearSavingsElement = document.getElementById('fifteenYearSavings');
// Default values
let costPerTherm = parseFloat(costInput.value) || 1.50; // Default to 1.50 if no input
let currentAFUE = 80; // Valor AFUE predeterminado (puede ajustarse dinámicamente con el slider)

var handle = $("#custom-handle");
var x = window.matchMedia("(max-width: 520px)")

const savingsData = {
    "US National Average": {
        10: { percent: 0, fiveYear: 0, tenYear: 0, fifteenYear: 0 },
        15: { percent: 33, fiveYear: 540, tenYear: 1080, fifteenYear: 1620 },
        20: { percent: 50, fiveYear: 810, tenYear: 1620, fifteenYear: 2430 },
        25: { percent: 60, fiveYear: 975, tenYear: 1950, fifteenYear: 2925 },
        28: { percent: 66, fiveYear: 1070, tenYear: 2140, fifteenYear: 3210 }
    },
    "Alabama": {
        10: { percent: 0, fiveYear: 0, tenYear: 0, fifteenYear: 0 },
        15: { percent: 35, fiveYear: 600, tenYear: 1200, fifteenYear: 1800 },
        20: { percent: 52, fiveYear: 900, tenYear: 1800, fifteenYear: 2700 },
        25: { percent: 62, fiveYear: 1080, tenYear: 2160, fifteenYear: 3240 },
        28: { percent: 68, fiveYear: 1180, tenYear: 2360, fifteenYear: 3540 }
    },
    "Alaska": {
        10: { percent: 0, fiveYear: 0, tenYear: 0, fifteenYear: 0 },
        15: { percent: 28, fiveYear: 450, tenYear: 900, fifteenYear: 1350 },
        20: { percent: 42, fiveYear: 680, tenYear: 1360, fifteenYear: 2040 },
        25: { percent: 52, fiveYear: 840, tenYear: 1680, fifteenYear: 2520 },
        28: { percent: 60, fiveYear: 960, tenYear: 1920, fifteenYear: 2880 }
    },
    "Arizona": {
        10: { percent: 0, fiveYear: 0, tenYear: 0, fifteenYear: 0 },
        15: { percent: 37, fiveYear: 620, tenYear: 1240, fifteenYear: 1860 },
        20: { percent: 53, fiveYear: 930, tenYear: 1860, fifteenYear: 2790 },
        25: { percent: 64, fiveYear: 1120, tenYear: 2240, fifteenYear: 3360 },
        28: { percent: 70, fiveYear: 1220, tenYear: 2440, fifteenYear: 3660 }
    },
    "Arkansas": {
        10: { percent: 0, fiveYear: 0, tenYear: 0, fifteenYear: 0 },
        15: { percent: 30, fiveYear: 500, tenYear: 1000, fifteenYear: 1500 },
        20: { percent: 45, fiveYear: 750, tenYear: 1500, fifteenYear: 2250 },
        25: { percent: 55, fiveYear: 900, tenYear: 1800, fifteenYear: 2700 },
        28: { percent: 62, fiveYear: 1020, tenYear: 2040, fifteenYear: 3060 }
    },
    "California": {
        10: { percent: 0, fiveYear: 0, tenYear: 0, fifteenYear: 0 },
        15: { percent: 30, fiveYear: 500, tenYear: 1000, fifteenYear: 1500 },
        20: { percent: 45, fiveYear: 750, tenYear: 1500, fifteenYear: 2250 },
        25: { percent: 55, fiveYear: 900, tenYear: 1800, fifteenYear: 2700 },
        28: { percent: 63, fiveYear: 1020, tenYear: 2040, fifteenYear: 3060 }
    },
    "Colorado": {
        10: { percent: 0, fiveYear: 0, tenYear: 0, fifteenYear: 0 },
        15: { percent: 32, fiveYear: 520, tenYear: 1040, fifteenYear: 1560 },
        20: { percent: 48, fiveYear: 780, tenYear: 1560, fifteenYear: 2340 },
        25: { percent: 58, fiveYear: 950, tenYear: 1900, fifteenYear: 2850 },
        28: { percent: 65, fiveYear: 1060, tenYear: 2120, fifteenYear: 3180 }
    },
    "Connecticut": {
        10: { percent: 0, fiveYear: 0, tenYear: 0, fifteenYear: 0 },
        15: { percent: 33, fiveYear: 540, tenYear: 1080, fifteenYear: 1620 },
        20: { percent: 49, fiveYear: 790, tenYear: 1580, fifteenYear: 2370 },
        25: { percent: 59, fiveYear: 950, tenYear: 1900, fifteenYear: 2850 },
        28: { percent: 67, fiveYear: 1080, tenYear: 2160, fifteenYear: 3240 }
    },
    "Delaware": {
        10: { percent: 0, fiveYear: 0, tenYear: 0, fifteenYear: 0 },
        15: { percent: 35, fiveYear: 600, tenYear: 1200, fifteenYear: 1800 },
        20: { percent: 50, fiveYear: 800, tenYear: 1600, fifteenYear: 2400 },
        25: { percent: 60, fiveYear: 950, tenYear: 1900, fifteenYear: 2850 },
        28: { percent: 68, fiveYear: 1100, tenYear: 2200, fifteenYear: 3300 }
    },
    "Florida": {
        10: { percent: 0, fiveYear: 0, tenYear: 0, fifteenYear: 0 },
        15: { percent: 32, fiveYear: 520, tenYear: 1040, fifteenYear: 1560 },
        20: { percent: 48, fiveYear: 780, tenYear: 1560, fifteenYear: 2340 },
        25: { percent: 58, fiveYear: 950, tenYear: 1900, fifteenYear: 2850 },
        28: { percent: 65, fiveYear: 1060, tenYear: 2120, fifteenYear: 3180 }
    },
    "Georgia": {
        10: { percent: 0, fiveYear: 0, tenYear: 0, fifteenYear: 0 },
        15: { percent: 33, fiveYear: 540, tenYear: 1080, fifteenYear: 1620 },
        20: { percent: 49, fiveYear: 790, tenYear: 1580, fifteenYear: 2370 },
        25: { percent: 59, fiveYear: 950, tenYear: 1900, fifteenYear: 2850 },
        28: { percent: 67, fiveYear: 1080, tenYear: 2160, fifteenYear: 3240 }
    },
    "Hawaii": {
        10: { percent: 0, fiveYear: 0, tenYear: 0, fifteenYear: 0 },
        15: { percent: 25, fiveYear: 500, tenYear: 1000, fifteenYear: 1500 },
        20: { percent: 40, fiveYear: 800, tenYear: 1600, fifteenYear: 2400 },
        25: { percent: 50, fiveYear: 1000, tenYear: 2000, fifteenYear: 3000 },
        28: { percent: 58, fiveYear: 1160, tenYear: 2320, fifteenYear: 3480 }
    },
    "Idaho": {
        10: { percent: 0, fiveYear: 0, tenYear: 0, fifteenYear: 0 },
        15: { percent: 32, fiveYear: 640, tenYear: 1280, fifteenYear: 1920 },
        20: { percent: 45, fiveYear: 900, tenYear: 1800, fifteenYear: 2700 },
        25: { percent: 55, fiveYear: 1100, tenYear: 2200, fifteenYear: 3300 },
        28: { percent: 63, fiveYear: 1260, tenYear: 2520, fifteenYear: 3780 }
    },
    "Illinois": {
        10: { percent: 0, fiveYear: 0, tenYear: 0, fifteenYear: 0 },
        15: { percent: 33, fiveYear: 660, tenYear: 1320, fifteenYear: 1980 },
        20: { percent: 47, fiveYear: 940, tenYear: 1880, fifteenYear: 2820 },
        25: { percent: 57, fiveYear: 1140, tenYear: 2280, fifteenYear: 3420 },
        28: { percent: 65, fiveYear: 1300, tenYear: 2600, fifteenYear: 3900 }
    },
    "Indiana": {
        10: { percent: 0, fiveYear: 0, tenYear: 0, fifteenYear: 0 },
        15: { percent: 35, fiveYear: 700, tenYear: 1400, fifteenYear: 2100 },
        20: { percent: 50, fiveYear: 1000, tenYear: 2000, fifteenYear: 3000 },
        25: { percent: 60, fiveYear: 1200, tenYear: 2400, fifteenYear: 3600 },
        28: { percent: 68, fiveYear: 1360, tenYear: 2720, fifteenYear: 4080 }
    },
    "Iowa": {
        10: { percent: 0, fiveYear: 0, tenYear: 0, fifteenYear: 0 },
        15: { percent: 33, fiveYear: 660, tenYear: 1320, fifteenYear: 1980 },
        20: { percent: 48, fiveYear: 960, tenYear: 1920, fifteenYear: 2880 },
        25: { percent: 58, fiveYear: 1160, tenYear: 2320, fifteenYear: 3480 },
        28: { percent: 66, fiveYear: 1320, tenYear: 2640, fifteenYear: 3960 }
    },
    "Kansas": {
        10: { percent: 0, fiveYear: 0, tenYear: 0, fifteenYear: 0 },
        15: { percent: 34, fiveYear: 680, tenYear: 1360, fifteenYear: 2040 },
        20: { percent: 49, fiveYear: 980, tenYear: 1960, fifteenYear: 2940 },
        25: { percent: 59, fiveYear: 1180, tenYear: 2360, fifteenYear: 3540 },
        28: { percent: 67, fiveYear: 1340, tenYear: 2680, fifteenYear: 4020 }
    },
    "Kentucky": {
        10: { percent: 0, fiveYear: 0, tenYear: 0, fifteenYear: 0 },
        15: { percent: 35, fiveYear: 700, tenYear: 1400, fifteenYear: 2100 },
        20: { percent: 50, fiveYear: 1000, tenYear: 2000, fifteenYear: 3000 },
        25: { percent: 60, fiveYear: 1200, tenYear: 2400, fifteenYear: 3600 },
        28: { percent: 68, fiveYear: 1360, tenYear: 2720, fifteenYear: 4080 }
    },
    "Louisiana": {
        10: { percent: 0, fiveYear: 0, tenYear: 0, fifteenYear: 0 },
        15: { percent: 36, fiveYear: 720, tenYear: 1440, fifteenYear: 2160 },
        20: { percent: 51, fiveYear: 1020, tenYear: 2040, fifteenYear: 3060 },
        25: { percent: 61, fiveYear: 1220, tenYear: 2440, fifteenYear: 3660 },
        28: { percent: 69, fiveYear: 1380, tenYear: 2760, fifteenYear: 4140 }
    },
    "Maine": {
        10: { percent: 0, fiveYear: 0, tenYear: 0, fifteenYear: 0 },
        15: { percent: 30, fiveYear: 600, tenYear: 1200, fifteenYear: 1800 },
        20: { percent: 45, fiveYear: 900, tenYear: 1800, fifteenYear: 2700 },
        25: { percent: 55, fiveYear: 1100, tenYear: 2200, fifteenYear: 3300 },
        28: { percent: 63, fiveYear: 1260, tenYear: 2520, fifteenYear: 3780 }
    },
    "Maryland": {
        10: { percent: 0, fiveYear: 0, tenYear: 0, fifteenYear: 0 },
        15: { percent: 33, fiveYear: 660, tenYear: 1320, fifteenYear: 1980 },
        20: { percent: 49, fiveYear: 980, tenYear: 1960, fifteenYear: 2940 },
        25: { percent: 59, fiveYear: 1180, tenYear: 2360, fifteenYear: 3540 },
        28: { percent: 67, fiveYear: 1340, tenYear: 2680, fifteenYear: 4020 }
    },
    "Massachusetts": {
        10: { percent: 0, fiveYear: 0, tenYear: 0, fifteenYear: 0 },
        15: { percent: 34, fiveYear: 680, tenYear: 1360, fifteenYear: 2040 },
        20: { percent: 49, fiveYear: 980, tenYear: 1960, fifteenYear: 2940 },
        25: { percent: 59, fiveYear: 1180, tenYear: 2360, fifteenYear: 3540 },
        28: { percent: 67, fiveYear: 1340, tenYear: 2680, fifteenYear: 4020 }
    },
    "Michigan": {
        10: { percent: 0, fiveYear: 0, tenYear: 0, fifteenYear: 0 },
        15: { percent: 33, fiveYear: 660, tenYear: 1320, fifteenYear: 1980 },
        20: { percent: 48, fiveYear: 960, tenYear: 1920, fifteenYear: 2880 },
        25: { percent: 58, fiveYear: 1160, tenYear: 2320, fifteenYear: 3480 },
        28: { percent: 66, fiveYear: 1320, tenYear: 2640, fifteenYear: 3960 }
    },
    "Minnesota": {
        10: { percent: 0, fiveYear: 0, tenYear: 0, fifteenYear: 0 },
        15: { percent: 32, fiveYear: 640, tenYear: 1280, fifteenYear: 1920 },
        20: { percent: 47, fiveYear: 940, tenYear: 1880, fifteenYear: 2820 },
        25: { percent: 57, fiveYear: 1140, tenYear: 2280, fifteenYear: 3420 },
        28: { percent: 65, fiveYear: 1300, tenYear: 2600, fifteenYear: 3900 }
    },
    "Mississippi": {
        10: { percent: 0, fiveYear: 0, tenYear: 0, fifteenYear: 0 },
        15: { percent: 34, fiveYear: 680, tenYear: 1360, fifteenYear: 2040 },
        20: { percent: 49, fiveYear: 980, tenYear: 1960, fifteenYear: 2940 },
        25: { percent: 59, fiveYear: 1180, tenYear: 2360, fifteenYear: 3540 },
        28: { percent: 67, fiveYear: 1340, tenYear: 2680, fifteenYear: 4020 }
    },
    "Missouri": {
        10: { percent: 0, fiveYear: 0, tenYear: 0, fifteenYear: 0 },
        15: { percent: 33, fiveYear: 660, tenYear: 1320, fifteenYear: 1980 },
        20: { percent: 48, fiveYear: 960, tenYear: 1920, fifteenYear: 2880 },
        25: { percent: 58, fiveYear: 1160, tenYear: 2320, fifteenYear: 3480 },
        28: { percent: 66, fiveYear: 1320, tenYear: 2640, fifteenYear: 3960 }
    },
    "Montana": {
        10: { percent: 0, fiveYear: 0, tenYear: 0, fifteenYear: 0 },
        15: { percent: 32, fiveYear: 640, tenYear: 1280, fifteenYear: 1920 },
        20: { percent: 47, fiveYear: 940, tenYear: 1880, fifteenYear: 2820 },
        25: { percent: 57, fiveYear: 1140, tenYear: 2280, fifteenYear: 3420 },
        28: { percent: 65, fiveYear: 1300, tenYear: 2600, fifteenYear: 3900 }
    },
    "Nebraska": {
        10: { percent: 0, fiveYear: 0, tenYear: 0, fifteenYear: 0 },
        15: { percent: 34, fiveYear: 680, tenYear: 1360, fifteenYear: 2040 },
        20: { percent: 49, fiveYear: 980, tenYear: 1960, fifteenYear: 2940 },
        25: { percent: 59, fiveYear: 1180, tenYear: 2360, fifteenYear: 3540 },
        28: { percent: 67, fiveYear: 1340, tenYear: 2680, fifteenYear: 4020 }
    },
    "Nevada": {
        10: { percent: 0, fiveYear: 0, tenYear: 0, fifteenYear: 0 },
        15: { percent: 32, fiveYear: 640, tenYear: 1280, fifteenYear: 1920 },
        20: { percent: 47, fiveYear: 940, tenYear: 1880, fifteenYear: 2820 },
        25: { percent: 57, fiveYear: 1140, tenYear: 2280, fifteenYear: 3420 },
        28: { percent: 65, fiveYear: 1300, tenYear: 2600, fifteenYear: 3900 }
    },
    "New Hampshire": {
        10: { percent: 0, fiveYear: 0, tenYear: 0, fifteenYear: 0 },
        15: { percent: 33, fiveYear: 660, tenYear: 1320, fifteenYear: 1980 },
        20: { percent: 48, fiveYear: 960, tenYear: 1920, fifteenYear: 2880 },
        25: { percent: 58, fiveYear: 1160, tenYear: 2320, fifteenYear: 3480 },
        28: { percent: 66, fiveYear: 1320, tenYear: 2640, fifteenYear: 3960 }
    },
    "New Jersey": {
        10: { percent: 0, fiveYear: 0, tenYear: 0, fifteenYear: 0 },
        15: { percent: 34, fiveYear: 680, tenYear: 1360, fifteenYear: 2040 },
        20: { percent: 49, fiveYear: 980, tenYear: 1960, fifteenYear: 2940 },
        25: { percent: 59, fiveYear: 1180, tenYear: 2360, fifteenYear: 3540 },
        28: { percent: 67, fiveYear: 1340, tenYear: 2680, fifteenYear: 4020 }
    },
    "New Mexico": {
        10: { percent: 0, fiveYear: 0, tenYear: 0, fifteenYear: 0 },
        15: { percent: 30, fiveYear: 600, tenYear: 1200, fifteenYear: 1800 },
        20: { percent: 45, fiveYear: 900, tenYear: 1800, fifteenYear: 2700 },
        25: { percent: 55, fiveYear: 1100, tenYear: 2200, fifteenYear: 3300 },
        28: { percent: 63, fiveYear: 1260, tenYear: 2520, fifteenYear: 3780 }
    },
    "New York": {
        10: { percent: 0, fiveYear: 0, tenYear: 0, fifteenYear: 0 },
        15: { percent: 35, fiveYear: 700, tenYear: 1400, fifteenYear: 2100 },
        20: { percent: 50, fiveYear: 1000, tenYear: 2000, fifteenYear: 3000 },
        25: { percent: 60, fiveYear: 1200, tenYear: 2400, fifteenYear: 3600 },
        28: { percent: 68, fiveYear: 1360, tenYear: 2720, fifteenYear: 4080 }
    },
    "North Carolina": {
        10: { percent: 0, fiveYear: 0, tenYear: 0, fifteenYear: 0 },
        15: { percent: 33, fiveYear: 660, tenYear: 1320, fifteenYear: 1980 },
        20: { percent: 48, fiveYear: 960, tenYear: 1920, fifteenYear: 2880 },
        25: { percent: 58, fiveYear: 1160, tenYear: 2320, fifteenYear: 3480 },
        28: { percent: 66, fiveYear: 1320, tenYear: 2640, fifteenYear: 3960 }
    },
    "North Dakota": {
        10: { percent: 0, fiveYear: 0, tenYear: 0, fifteenYear: 0 },
        15: { percent: 32, fiveYear: 640, tenYear: 1280, fifteenYear: 1920 },
        20: { percent: 47, fiveYear: 940, tenYear: 1880, fifteenYear: 2820 },
        25: { percent: 57, fiveYear: 1140, tenYear: 2280, fifteenYear: 3420 },
        28: { percent: 65, fiveYear: 1300, tenYear: 2600, fifteenYear: 3900 }
    },
    "Ohio": {
        10: { percent: 0, fiveYear: 0, tenYear: 0, fifteenYear: 0 },
        15: { percent: 34, fiveYear: 680, tenYear: 1360, fifteenYear: 2040 },
        20: { percent: 49, fiveYear: 980, tenYear: 1960, fifteenYear: 2940 },
        25: { percent: 59, fiveYear: 1180, tenYear: 2360, fifteenYear: 3540 },
        28: { percent: 67, fiveYear: 1340, tenYear: 2680, fifteenYear: 4020 }
    },
    "Oklahoma": {
        10: { percent: 0, fiveYear: 0, tenYear: 0, fifteenYear: 0 },
        15: { percent: 35, fiveYear: 700, tenYear: 1400, fifteenYear: 2100 },
        20: { percent: 50, fiveYear: 1000, tenYear: 2000, fifteenYear: 3000 },
        25: { percent: 60, fiveYear: 1200, tenYear: 2400, fifteenYear: 3600 },
        28: { percent: 68, fiveYear: 1360, tenYear: 2720, fifteenYear: 4080 }
    },
    "Oregon": {
        10: { percent: 0, fiveYear: 0, tenYear: 0, fifteenYear: 0 },
        15: { percent: 32, fiveYear: 640, tenYear: 1280, fifteenYear: 1920 },
        20: { percent: 47, fiveYear: 940, tenYear: 1880, fifteenYear: 2820 },
        25: { percent: 57, fiveYear: 1140, tenYear: 2280, fifteenYear: 3420 },
        28: { percent: 65, fiveYear: 1300, tenYear: 2600, fifteenYear: 3900 }
    },
    "Pennsylvania": {
        10: { percent: 0, fiveYear: 0, tenYear: 0, fifteenYear: 0 },
        15: { percent: 34, fiveYear: 680, tenYear: 1360, fifteenYear: 2040 },
        20: { percent: 49, fiveYear: 980, tenYear: 1960, fifteenYear: 2940 },
        25: { percent: 59, fiveYear: 1180, tenYear: 2360, fifteenYear: 3540 },
        28: { percent: 67, fiveYear: 1340, tenYear: 2680, fifteenYear: 4020 }
    },
    "Rhode Island": {
        10: { percent: 0, fiveYear: 0, tenYear: 0, fifteenYear: 0 },
        15: { percent: 33, fiveYear: 660, tenYear: 1320, fifteenYear: 1980 },
        20: { percent: 48, fiveYear: 960, tenYear: 1920, fifteenYear: 2880 },
        25: { percent: 58, fiveYear: 1160, tenYear: 2320, fifteenYear: 3480 },
        28: { percent: 66, fiveYear: 1320, tenYear: 2640, fifteenYear: 3960 }
    },
    "South Carolina": {
        10: { percent: 0, fiveYear: 0, tenYear: 0, fifteenYear: 0 },
        15: { percent: 35, fiveYear: 700, tenYear: 1400, fifteenYear: 2100 },
        20: { percent: 50, fiveYear: 1000, tenYear: 2000, fifteenYear: 3000 },
        25: { percent: 60, fiveYear: 1200, tenYear: 2400, fifteenYear: 3600 },
        28: { percent: 68, fiveYear: 1360, tenYear: 2720, fifteenYear: 4080 }
    },
    "South Dakota": {
        10: { percent: 0, fiveYear: 0, tenYear: 0, fifteenYear: 0 },
        15: { percent: 32, fiveYear: 640, tenYear: 1280, fifteenYear: 1920 },
        20: { percent: 47, fiveYear: 940, tenYear: 1880, fifteenYear: 2820 },
        25: { percent: 57, fiveYear: 1140, tenYear: 2280, fifteenYear: 3420 },
        28: { percent: 65, fiveYear: 1300, tenYear: 2600, fifteenYear: 3900 }
    },
    "Tennessee": {
        10: { percent: 0, fiveYear: 0, tenYear: 0, fifteenYear: 0 },
        15: { percent: 35, fiveYear: 700, tenYear: 1400, fifteenYear: 2100 },
        20: { percent: 50, fiveYear: 1000, tenYear: 2000, fifteenYear: 3000 },
        25: { percent: 60, fiveYear: 1200, tenYear: 2400, fifteenYear: 3600 },
        28: { percent: 68, fiveYear: 1360, tenYear: 2720, fifteenYear: 4080 }
    },
    "Texas": {
        10: { percent: 0, fiveYear: 0, tenYear: 0, fifteenYear: 0 },
        15: { percent: 33, fiveYear: 660, tenYear: 1320, fifteenYear: 1980 },
        20: { percent: 48, fiveYear: 960, tenYear: 1920, fifteenYear: 2880 },
        25: { percent: 58, fiveYear: 1160, tenYear: 2320, fifteenYear: 3480 },
        28: { percent: 66, fiveYear: 1320, tenYear: 2640, fifteenYear: 3960 }
    },
    "Utah": {
        10: { percent: 0, fiveYear: 0, tenYear: 0, fifteenYear: 0 },
        15: { percent: 32, fiveYear: 640, tenYear: 1280, fifteenYear: 1920 },
        20: { percent: 47, fiveYear: 940, tenYear: 1880, fifteenYear: 2820 },
        25: { percent: 57, fiveYear: 1140, tenYear: 2280, fifteenYear: 3420 },
        28: { percent: 65, fiveYear: 1300, tenYear: 2600, fifteenYear: 3900 }
    },
    "Vermont": {
        10: { percent: 0, fiveYear: 0, tenYear: 0, fifteenYear: 0 },
        15: { percent: 34, fiveYear: 680, tenYear: 1360, fifteenYear: 2040 },
        20: { percent: 49, fiveYear: 980, tenYear: 1960, fifteenYear: 2940 },
        25: { percent: 59, fiveYear: 1180, tenYear: 2360, fifteenYear: 3540 },
        28: { percent: 67, fiveYear: 1340, tenYear: 2680, fifteenYear: 4020 }
    },
    "Virginia": {
        10: { percent: 0, fiveYear: 0, tenYear: 0, fifteenYear: 0 },
        15: { percent: 35, fiveYear: 700, tenYear: 1400, fifteenYear: 2100 },
        20: { percent: 50, fiveYear: 1000, tenYear: 2000, fifteenYear: 3000 },
        25: { percent: 60, fiveYear: 1200, tenYear: 2400, fifteenYear: 3600 },
        28: { percent: 68, fiveYear: 1360, tenYear: 2720, fifteenYear: 4080 }
    },
    "Washington": {
        10: { percent: 0, fiveYear: 0, tenYear: 0, fifteenYear: 0 },
        15: { percent: 32, fiveYear: 640, tenYear: 1280, fifteenYear: 1920 },
        20: { percent: 47, fiveYear: 940, tenYear: 1880, fifteenYear: 2820 },
        25: { percent: 57, fiveYear: 1140, tenYear: 2280, fifteenYear: 3420 },
        28: { percent: 65, fiveYear: 1300, tenYear: 2600, fifteenYear: 3900 }
    },
    "West Virginia": {
        10: { percent: 0, fiveYear: 0, tenYear: 0, fifteenYear: 0 },
        15: { percent: 33, fiveYear: 660, tenYear: 1320, fifteenYear: 1980 },
        20: { percent: 48, fiveYear: 960, tenYear: 1920, fifteenYear: 2880 },
        25: { percent: 58, fiveYear: 1160, tenYear: 2320, fifteenYear: 3480 },
        28: { percent: 66, fiveYear: 1320, tenYear: 2640, fifteenYear: 3960 }
    },
    "Wisconsin": {
        10: { percent: 0, fiveYear: 0, tenYear: 0, fifteenYear: 0 },
        15: { percent: 34, fiveYear: 680, tenYear: 1360, fifteenYear: 2040 },
        20: { percent: 49, fiveYear: 980, tenYear: 1960, fifteenYear: 2940 },
        25: { percent: 59, fiveYear: 1180, tenYear: 2360, fifteenYear: 3540 },
        28: { percent: 67, fiveYear: 1340, tenYear: 2680, fifteenYear: 4020 }
    },
    "Wyoming": {
        10: { percent: 0, fiveYear: 0, tenYear: 0, fifteenYear: 0 },
        15: { percent: 32, fiveYear: 640, tenYear: 1280, fifteenYear: 1920 },
        20: { percent: 47, fiveYear: 940, tenYear: 1880, fifteenYear: 2820 },
        25: { percent: 57, fiveYear: 1140, tenYear: 2280, fifteenYear: 3420 },
        28: { percent: 65, fiveYear: 1300, tenYear: 2600, fifteenYear: 3900 }
    }
};
const afueValues = {
    "US National Average": {
        60: { percent: 0, fiveYear: 0, tenYear: 0, fifteenYear: 0 },
        65: { percent: 8, fiveYear: 802, tenYear: 1604, fifteenYear: 2406 },
        70: { percent: 14, fiveYear: 1403, tenYear: 2806, fifteenYear: 4209 },
        75: { percent: 20, fiveYear: 2004, tenYear: 4008, fifteenYear: 6012 },
        80: { percent: 25, fiveYear: 2506, tenYear: 5012, fifteenYear: 7518 },
        85: { percent: 29, fiveYear: 2907, tenYear: 5814, fifteenYear: 8721 },
        90: { percent: 33, fiveYear: 3308, tenYear: 6616, fifteenYear: 9924 },
        95: { percent: 37, fiveYear: 3693, tenYear: 7386, fifteenYear: 11079 },
        99: { percent: 40, fiveYear: 3992, tenYear: 7984, fifteenYear: 11976 }
    },
    "Alabama": {
        60: { percent: 0, fiveYear: 0, tenYear: 0, fifteenYear: 0 },
        65: { percent: 8, fiveYear: 800, tenYear: 1600, fifteenYear: 2400 },
        70: { percent: 14, fiveYear: 1400, tenYear: 2800, fifteenYear: 4200 },
        75: { percent: 20, fiveYear: 2000, tenYear: 4000, fifteenYear: 6000 },
        80: { percent: 25, fiveYear: 2500, tenYear: 5000, fifteenYear: 7500 },
        85: { percent: 29, fiveYear: 2900, tenYear: 5800, fifteenYear: 8700 },
        90: { percent: 33, fiveYear: 3300, tenYear: 6600, fifteenYear: 9900 },
        95: { percent: 37, fiveYear: 3700, tenYear: 7400, fifteenYear: 11100 },
        99: { percent: 40, fiveYear: 4000, tenYear: 8000, fifteenYear: 12000 }
    },
    "Alaska": {
        60: { percent: 0, fiveYear: 0, tenYear: 0, fifteenYear: 0 },
        65: { percent: 10, fiveYear: 1000, tenYear: 2000, fifteenYear: 3000 },
        70: { percent: 18, fiveYear: 1800, tenYear: 3600, fifteenYear: 5400 },
        75: { percent: 24, fiveYear: 2400, tenYear: 4800, fifteenYear: 7200 },
        80: { percent: 30, fiveYear: 3000, tenYear: 6000, fifteenYear: 9000 },
        85: { percent: 35, fiveYear: 3500, tenYear: 7000, fifteenYear: 10500 },
        90: { percent: 39, fiveYear: 3900, tenYear: 7800, fifteenYear: 11700 },
        95: { percent: 43, fiveYear: 4300, tenYear: 8600, fifteenYear: 12900 },
        99: { percent: 47, fiveYear: 4700, tenYear: 9400, fifteenYear: 14100 }
    },
    "Arizona": {
        60: { percent: 0, fiveYear: 0, tenYear: 0, fifteenYear: 0 },
        65: { percent: 7, fiveYear: 700, tenYear: 1400, fifteenYear: 2100 },
        70: { percent: 12, fiveYear: 1200, tenYear: 2400, fifteenYear: 3600 },
        75: { percent: 18, fiveYear: 1800, tenYear: 3600, fifteenYear: 5400 },
        80: { percent: 24, fiveYear: 2400, tenYear: 4800, fifteenYear: 7200 },
        85: { percent: 28, fiveYear: 2800, tenYear: 5600, fifteenYear: 8400 },
        90: { percent: 32, fiveYear: 3200, tenYear: 6400, fifteenYear: 9600 },
        95: { percent: 35, fiveYear: 3500, tenYear: 7000, fifteenYear: 10500 },
        99: { percent: 38, fiveYear: 3800, tenYear: 7600, fifteenYear: 11400 }
    },
    "Arkansas": {
        60: { percent: 0, fiveYear: 0, tenYear: 0, fifteenYear: 0 },
        65: { percent: 8, fiveYear: 800, tenYear: 1600, fifteenYear: 2400 },
        70: { percent: 14, fiveYear: 1400, tenYear: 2800, fifteenYear: 4200 },
        75: { percent: 20, fiveYear: 2000, tenYear: 4000, fifteenYear: 6000 },
        80: { percent: 25, fiveYear: 2500, tenYear: 5000, fifteenYear: 7500 },
        85: { percent: 29, fiveYear: 2900, tenYear: 5800, fifteenYear: 8700 },
        90: { percent: 33, fiveYear: 3300, tenYear: 6600, fifteenYear: 9900 },
        95: { percent: 37, fiveYear: 3700, tenYear: 7400, fifteenYear: 11100 },
        99: { percent: 40, fiveYear: 4000, tenYear: 8000, fifteenYear: 12000 }
    },
    "California": {
        60: { percent: 0, fiveYear: 0, tenYear: 0, fifteenYear: 0 },
        65: { percent: 6, fiveYear: 600, tenYear: 1200, fifteenYear: 1800 },
        70: { percent: 12, fiveYear: 1200, tenYear: 2400, fifteenYear: 3600 },
        75: { percent: 18, fiveYear: 1800, tenYear: 3600, fifteenYear: 5400 },
        80: { percent: 24, fiveYear: 2400, tenYear: 4800, fifteenYear: 7200 },
        85: { percent: 28, fiveYear: 2800, tenYear: 5600, fifteenYear: 8400 },
        90: { percent: 32, fiveYear: 3200, tenYear: 6400, fifteenYear: 9600 },
        95: { percent: 35, fiveYear: 3500, tenYear: 7000, fifteenYear: 10500 },
        99: { percent: 38, fiveYear: 3800, tenYear: 7600, fifteenYear: 11400 }
    },
    "Colorado": {
        60: { percent: 0, fiveYear: 0, tenYear: 0, fifteenYear: 0 },
        65: { percent: 9, fiveYear: 900, tenYear: 1800, fifteenYear: 2700 },
        70: { percent: 15, fiveYear: 1500, tenYear: 3000, fifteenYear: 4500 },
        75: { percent: 21, fiveYear: 2100, tenYear: 4200, fifteenYear: 6300 },
        80: { percent: 26, fiveYear: 2600, tenYear: 5200, fifteenYear: 7800 },
        85: { percent: 30, fiveYear: 3000, tenYear: 6000, fifteenYear: 9000 },
        90: { percent: 34, fiveYear: 3400, tenYear: 6800, fifteenYear: 10200 },
        95: { percent: 38, fiveYear: 3800, tenYear: 7600, fifteenYear: 11400 },
        99: { percent: 41, fiveYear: 4100, tenYear: 8200, fifteenYear: 12300 }
    },
    "Connecticut": {
        60: { percent: 0, fiveYear: 0, tenYear: 0, fifteenYear: 0 },
        65: { percent: 10, fiveYear: 1000, tenYear: 2000, fifteenYear: 3000 },
        70: { percent: 16, fiveYear: 1600, tenYear: 3200, fifteenYear: 4800 },
        75: { percent: 22, fiveYear: 2200, tenYear: 4400, fifteenYear: 6600 },
        80: { percent: 27, fiveYear: 2700, tenYear: 5400, fifteenYear: 8100 },
        85: { percent: 31, fiveYear: 3100, tenYear: 6200, fifteenYear: 9300 },
        90: { percent: 35, fiveYear: 3500, tenYear: 7000, fifteenYear: 10500 },
        95: { percent: 39, fiveYear: 3900, tenYear: 7800, fifteenYear: 11700 },
        99: { percent: 42, fiveYear: 4200, tenYear: 8400, fifteenYear: 12600 }
    },
    "Delaware": {
        60: { percent: 0, fiveYear: 0, tenYear: 0, fifteenYear: 0 },
        65: { percent: 9, fiveYear: 900, tenYear: 1800, fifteenYear: 2700 },
        70: { percent: 15, fiveYear: 1500, tenYear: 3000, fifteenYear: 4500 },
        75: { percent: 21, fiveYear: 2100, tenYear: 4200, fifteenYear: 6300 },
        80: { percent: 26, fiveYear: 2600, tenYear: 5200, fifteenYear: 7800 },
        85: { percent: 30, fiveYear: 3000, tenYear: 6000, fifteenYear: 9000 },
        90: { percent: 34, fiveYear: 3400, tenYear: 6800, fifteenYear: 10200 },
        95: { percent: 38, fiveYear: 3800, tenYear: 7600, fifteenYear: 11400 },
        99: { percent: 41, fiveYear: 4100, tenYear: 8200, fifteenYear: 12300 }
    },
    "Florida": {
        60: { percent: 0, fiveYear: 0, tenYear: 0, fifteenYear: 0 },
        65: { percent: 6, fiveYear: 600, tenYear: 1200, fifteenYear: 1800 },
        70: { percent: 12, fiveYear: 1200, tenYear: 2400, fifteenYear: 3600 },
        75: { percent: 18, fiveYear: 1800, tenYear: 3600, fifteenYear: 5400 },
        80: { percent: 24, fiveYear: 2400, tenYear: 4800, fifteenYear: 7200 },
        85: { percent: 28, fiveYear: 2800, tenYear: 5600, fifteenYear: 8400 },
        90: { percent: 32, fiveYear: 3200, tenYear: 6400, fifteenYear: 9600 },
        95: { percent: 35, fiveYear: 3500, tenYear: 7000, fifteenYear: 10500 },
        99: { percent: 38, fiveYear: 3800, tenYear: 7600, fifteenYear: 11400 }
    },
    "Georgia": {
        60: { percent: 0, fiveYear: 0, tenYear: 0, fifteenYear: 0 },
        65: { percent: 7, fiveYear: 700, tenYear: 1400, fifteenYear: 2100 },
        70: { percent: 13, fiveYear: 1300, tenYear: 2600, fifteenYear: 3900 },
        75: { percent: 19, fiveYear: 1900, tenYear: 3800, fifteenYear: 5700 },
        80: { percent: 25, fiveYear: 2500, tenYear: 5000, fifteenYear: 7500 },
        85: { percent: 29, fiveYear: 2900, tenYear: 5800, fifteenYear: 8700 },
        90: { percent: 33, fiveYear: 3300, tenYear: 6600, fifteenYear: 9900 },
        95: { percent: 37, fiveYear: 3700, tenYear: 7400, fifteenYear: 11100 },
        99: { percent: 40, fiveYear: 4000, tenYear: 8000, fifteenYear: 12000 }
    },
    "Hawaii": {
        60: { percent: 0, fiveYear: 0, tenYear: 0, fifteenYear: 0 },
        65: { percent: 5, fiveYear: 500, tenYear: 1000, fifteenYear: 1500 },
        70: { percent: 10, fiveYear: 1000, tenYear: 2000, fifteenYear: 3000 },
        75: { percent: 15, fiveYear: 1500, tenYear: 3000, fifteenYear: 4500 },
        80: { percent: 20, fiveYear: 2000, tenYear: 4000, fifteenYear: 6000 },
        85: { percent: 25, fiveYear: 2500, tenYear: 5000, fifteenYear: 7500 },
        90: { percent: 30, fiveYear: 3000, tenYear: 6000, fifteenYear: 9000 },
        95: { percent: 35, fiveYear: 3500, tenYear: 7000, fifteenYear: 10500 },
        99: { percent: 38, fiveYear: 3800, tenYear: 7600, fifteenYear: 11400 }
    },
    "Idaho": {
        60: { percent: 0, fiveYear: 0, tenYear: 0, fifteenYear: 0 },
        65: { percent: 10, fiveYear: 1000, tenYear: 2000, fifteenYear: 3000 },
        70: { percent: 17, fiveYear: 1700, tenYear: 3400, fifteenYear: 5100 },
        75: { percent: 23, fiveYear: 2300, tenYear: 4600, fifteenYear: 6900 },
        80: { percent: 29, fiveYear: 2900, tenYear: 5800, fifteenYear: 8700 },
        85: { percent: 34, fiveYear: 3400, tenYear: 6800, fifteenYear: 10200 },
        90: { percent: 39, fiveYear: 3900, tenYear: 7800, fifteenYear: 11700 },
        95: { percent: 43, fiveYear: 4300, tenYear: 8600, fifteenYear: 12900 },
        99: { percent: 47, fiveYear: 4700, tenYear: 9400, fifteenYear: 14100 }
    },
    "Illinois": {
        60: { percent: 0, fiveYear: 0, tenYear: 0, fifteenYear: 0 },
        65: { percent: 12, fiveYear: 1200, tenYear: 2400, fifteenYear: 3600 },
        70: { percent: 19, fiveYear: 1900, tenYear: 3800, fifteenYear: 5700 },
        75: { percent: 25, fiveYear: 2500, tenYear: 5000, fifteenYear: 7500 },
        80: { percent: 30, fiveYear: 3000, tenYear: 6000, fifteenYear: 9000 },
        85: { percent: 34, fiveYear: 3400, tenYear: 6800, fifteenYear: 10200 },
        90: { percent: 38, fiveYear: 3800, tenYear: 7600, fifteenYear: 11400 },
        95: { percent: 42, fiveYear: 4200, tenYear: 8400, fifteenYear: 12600 },
        99: { percent: 45, fiveYear: 4500, tenYear: 9000, fifteenYear: 13500 }
    },
    "Indiana": {
        60: { percent: 0, fiveYear: 0, tenYear: 0, fifteenYear: 0 },
        65: { percent: 11, fiveYear: 1100, tenYear: 2200, fifteenYear: 3300 },
        70: { percent: 18, fiveYear: 1800, tenYear: 3600, fifteenYear: 5400 },
        75: { percent: 24, fiveYear: 2400, tenYear: 4800, fifteenYear: 7200 },
        80: { percent: 29, fiveYear: 2900, tenYear: 5800, fifteenYear: 8700 },
        85: { percent: 33, fiveYear: 3300, tenYear: 6600, fifteenYear: 9900 },
        90: { percent: 37, fiveYear: 3700, tenYear: 7400, fifteenYear: 11100 },
        95: { percent: 41, fiveYear: 4100, tenYear: 8200, fifteenYear: 12300 },
        99: { percent: 44, fiveYear: 4400, tenYear: 8800, fifteenYear: 13200 }
    },
    "Iowa": {
        60: { percent: 0, fiveYear: 0, tenYear: 0, fifteenYear: 0 },
        65: { percent: 11, fiveYear: 1100, tenYear: 2200, fifteenYear: 3300 },
        70: { percent: 18, fiveYear: 1800, tenYear: 3600, fifteenYear: 5400 },
        75: { percent: 24, fiveYear: 2400, tenYear: 4800, fifteenYear: 7200 },
        80: { percent: 29, fiveYear: 2900, tenYear: 5800, fifteenYear: 8700 },
        85: { percent: 33, fiveYear: 3300, tenYear: 6600, fifteenYear: 9900 },
        90: { percent: 37, fiveYear: 3700, tenYear: 7400, fifteenYear: 11100 },
        95: { percent: 41, fiveYear: 4100, tenYear: 8200, fifteenYear: 12300 },
        99: { percent: 44, fiveYear: 4400, tenYear: 8800, fifteenYear: 13200 }
    },
    "Kansas": {
        60: { percent: 0, fiveYear: 0, tenYear: 0, fifteenYear: 0 },
        65: { percent: 10, fiveYear: 1000, tenYear: 2000, fifteenYear: 3000 },
        70: { percent: 17, fiveYear: 1700, tenYear: 3400, fifteenYear: 5100 },
        75: { percent: 23, fiveYear: 2300, tenYear: 4600, fifteenYear: 6900 },
        80: { percent: 29, fiveYear: 2900, tenYear: 5800, fifteenYear: 8700 },
        85: { percent: 34, fiveYear: 3400, tenYear: 6800, fifteenYear: 10200 },
        90: { percent: 39, fiveYear: 3900, tenYear: 7800, fifteenYear: 11700 },
        95: { percent: 43, fiveYear: 4300, tenYear: 8600, fifteenYear: 12900 },
        99: { percent: 47, fiveYear: 4700, tenYear: 9400, fifteenYear: 14100 }
    },
    "Kentucky": {
        60: { percent: 0, fiveYear: 0, tenYear: 0, fifteenYear: 0 },
        65: { percent: 9, fiveYear: 900, tenYear: 1800, fifteenYear: 2700 },
        70: { percent: 16, fiveYear: 1600, tenYear: 3200, fifteenYear: 4800 },
        75: { percent: 22, fiveYear: 2200, tenYear: 4400, fifteenYear: 6600 },
        80: { percent: 27, fiveYear: 2700, tenYear: 5400, fifteenYear: 8100 },
        85: { percent: 31, fiveYear: 3100, tenYear: 6200, fifteenYear: 9300 },
        90: { percent: 35, fiveYear: 3500, tenYear: 7000, fifteenYear: 10500 },
        95: { percent: 39, fiveYear: 3900, tenYear: 7800, fifteenYear: 11700 },
        99: { percent: 42, fiveYear: 4200, tenYear: 8400, fifteenYear: 12600 }
    },
    "Louisiana": {
        60: { percent: 0, fiveYear: 0, tenYear: 0, fifteenYear: 0 },
        65: { percent: 7, fiveYear: 700, tenYear: 1400, fifteenYear: 2100 },
        70: { percent: 12, fiveYear: 1200, tenYear: 2400, fifteenYear: 3600 },
        75: { percent: 18, fiveYear: 1800, tenYear: 3600, fifteenYear: 5400 },
        80: { percent: 24, fiveYear: 2400, tenYear: 4800, fifteenYear: 7200 },
        85: { percent: 28, fiveYear: 2800, tenYear: 5600, fifteenYear: 8400 },
        90: { percent: 32, fiveYear: 3200, tenYear: 6400, fifteenYear: 9600 },
        95: { percent: 35, fiveYear: 3500, tenYear: 7000, fifteenYear: 10500 },
        99: { percent: 38, fiveYear: 3800, tenYear: 7600, fifteenYear: 11400 }
    },
    "Maine": {
        60: { percent: 0, fiveYear: 0, tenYear: 0, fifteenYear: 0 },
        65: { percent: 10, fiveYear: 1000, tenYear: 2000, fifteenYear: 3000 },
        70: { percent: 18, fiveYear: 1800, tenYear: 3600, fifteenYear: 5400 },
        75: { percent: 24, fiveYear: 2400, tenYear: 4800, fifteenYear: 7200 },
        80: { percent: 30, fiveYear: 3000, tenYear: 6000, fifteenYear: 9000 },
        85: { percent: 35, fiveYear: 3500, tenYear: 7000, fifteenYear: 10500 },
        90: { percent: 39, fiveYear: 3900, tenYear: 7800, fifteenYear: 11700 },
        95: { percent: 43, fiveYear: 4300, tenYear: 8600, fifteenYear: 12900 },
        99: { percent: 47, fiveYear: 4700, tenYear: 9400, fifteenYear: 14100 }
    },
    "Maryland": {
        60: { percent: 0, fiveYear: 0, tenYear: 0, fifteenYear: 0 },
        65: { percent: 9, fiveYear: 900, tenYear: 1800, fifteenYear: 2700 },
        70: { percent: 16, fiveYear: 1600, tenYear: 3200, fifteenYear: 4800 },
        75: { percent: 22, fiveYear: 2200, tenYear: 4400, fifteenYear: 6600 },
        80: { percent: 27, fiveYear: 2700, tenYear: 5400, fifteenYear: 8100 },
        85: { percent: 31, fiveYear: 3100, tenYear: 6200, fifteenYear: 9300 },
        90: { percent: 35, fiveYear: 3500, tenYear: 7000, fifteenYear: 10500 },
        95: { percent: 39, fiveYear: 3900, tenYear: 7800, fifteenYear: 11700 },
        99: { percent: 42, fiveYear: 4200, tenYear: 8400, fifteenYear: 12600 }
    },
    "Massachusetts": {
        60: { percent: 0, fiveYear: 0, tenYear: 0, fifteenYear: 0 },
        65: { percent: 12, fiveYear: 1200, tenYear: 2400, fifteenYear: 3600 },
        70: { percent: 18, fiveYear: 1800, tenYear: 3600, fifteenYear: 5400 },
        75: { percent: 24, fiveYear: 2400, tenYear: 4800, fifteenYear: 7200 },
        80: { percent: 29, fiveYear: 2900, tenYear: 5800, fifteenYear: 8700 },
        85: { percent: 33, fiveYear: 3300, tenYear: 6600, fifteenYear: 9900 },
        90: { percent: 37, fiveYear: 3700, tenYear: 7400, fifteenYear: 11100 },
        95: { percent: 41, fiveYear: 4100, tenYear: 8200, fifteenYear: 12300 },
        99: { percent: 44, fiveYear: 4400, tenYear: 8800, fifteenYear: 13200 }
    },
    "Michigan": {
        60: { percent: 0, fiveYear: 0, tenYear: 0, fifteenYear: 0 },
        65: { percent: 11, fiveYear: 1100, tenYear: 2200, fifteenYear: 3300 },
        70: { percent: 18, fiveYear: 1800, tenYear: 3600, fifteenYear: 5400 },
        75: { percent: 24, fiveYear: 2400, tenYear: 4800, fifteenYear: 7200 },
        80: { percent: 29, fiveYear: 2900, tenYear: 5800, fifteenYear: 8700 },
        85: { percent: 33, fiveYear: 3300, tenYear: 6600, fifteenYear: 9900 },
        90: { percent: 37, fiveYear: 3700, tenYear: 7400, fifteenYear: 11100 },
        95: { percent: 41, fiveYear: 4100, tenYear: 8200, fifteenYear: 12300 },
        99: { percent: 44, fiveYear: 4400, tenYear: 8800, fifteenYear: 13200 }
    },
    "Minnesota": {
        60: { percent: 0, fiveYear: 0, tenYear: 0, fifteenYear: 0 },
        65: { percent: 12, fiveYear: 1200, tenYear: 2400, fifteenYear: 3600 },
        70: { percent: 19, fiveYear: 1900, tenYear: 3800, fifteenYear: 5700 },
        75: { percent: 25, fiveYear: 2500, tenYear: 5000, fifteenYear: 7500 },
        80: { percent: 30, fiveYear: 3000, tenYear: 6000, fifteenYear: 9000 },
        85: { percent: 34, fiveYear: 3400, tenYear: 6800, fifteenYear: 10200 },
        90: { percent: 38, fiveYear: 3800, tenYear: 7600, fifteenYear: 11400 },
        95: { percent: 42, fiveYear: 4200, tenYear: 8400, fifteenYear: 12600 },
        99: { percent: 45, fiveYear: 4500, tenYear: 9000, fifteenYear: 13500 }
    },
    "Mississippi": {
        60: { percent: 0, fiveYear: 0, tenYear: 0, fifteenYear: 0 },
        65: { percent: 8, fiveYear: 800, tenYear: 1600, fifteenYear: 2400 },
        70: { percent: 14, fiveYear: 1400, tenYear: 2800, fifteenYear: 4200 },
        75: { percent: 20, fiveYear: 2000, tenYear: 4000, fifteenYear: 6000 },
        80: { percent: 25, fiveYear: 2500, tenYear: 5000, fifteenYear: 7500 },
        85: { percent: 29, fiveYear: 2900, tenYear: 5800, fifteenYear: 8700 },
        90: { percent: 33, fiveYear: 3300, tenYear: 6600, fifteenYear: 9900 },
        95: { percent: 37, fiveYear: 3700, tenYear: 7400, fifteenYear: 11100 },
        99: { percent: 40, fiveYear: 4000, tenYear: 8000, fifteenYear: 12000 }
    },
    "Missouri": {
        60: { percent: 0, fiveYear: 0, tenYear: 0, fifteenYear: 0 },
        65: { percent: 11, fiveYear: 1100, tenYear: 2200, fifteenYear: 3300 },
        70: { percent: 18, fiveYear: 1800, tenYear: 3600, fifteenYear: 5400 },
        75: { percent: 24, fiveYear: 2400, tenYear: 4800, fifteenYear: 7200 },
        80: { percent: 29, fiveYear: 2900, tenYear: 5800, fifteenYear: 8700 },
        85: { percent: 33, fiveYear: 3300, tenYear: 6600, fifteenYear: 9900 },
        90: { percent: 37, fiveYear: 3700, tenYear: 7400, fifteenYear: 11100 },
        95: { percent: 41, fiveYear: 4100, tenYear: 8200, fifteenYear: 12300 },
        99: { percent: 44, fiveYear: 4400, tenYear: 8800, fifteenYear: 13200 }
    },
    "Montana": {
        60: { percent: 0, fiveYear: 0, tenYear: 0, fifteenYear: 0 },
        65: { percent: 12, fiveYear: 1200, tenYear: 2400, fifteenYear: 3600 },
        70: { percent: 19, fiveYear: 1900, tenYear: 3800, fifteenYear: 5700 },
        75: { percent: 25, fiveYear: 2500, tenYear: 5000, fifteenYear: 7500 },
        80: { percent: 30, fiveYear: 3000, tenYear: 6000, fifteenYear: 9000 },
        85: { percent: 34, fiveYear: 3400, tenYear: 6800, fifteenYear: 10200 },
        90: { percent: 38, fiveYear: 3800, tenYear: 7600, fifteenYear: 11400 },
        95: { percent: 42, fiveYear: 4200, tenYear: 8400, fifteenYear: 12600 },
        99: { percent: 45, fiveYear: 4500, tenYear: 9000, fifteenYear: 13500 }
    },
    "Nebraska": {
        60: { percent: 0, fiveYear: 0, tenYear: 0, fifteenYear: 0 },
        65: { percent: 10, fiveYear: 1000, tenYear: 2000, fifteenYear: 3000 },
        70: { percent: 17, fiveYear: 1700, tenYear: 3400, fifteenYear: 5100 },
        75: { percent: 23, fiveYear: 2300, tenYear: 4600, fifteenYear: 6900 },
        80: { percent: 29, fiveYear: 2900, tenYear: 5800, fifteenYear: 8700 },
        85: { percent: 34, fiveYear: 3400, tenYear: 6800, fifteenYear: 10200 },
        90: { percent: 39, fiveYear: 3900, tenYear: 7800, fifteenYear: 11700 },
        95: { percent: 43, fiveYear: 4300, tenYear: 8600, fifteenYear: 12900 },
        99: { percent: 47, fiveYear: 4700, tenYear: 9400, fifteenYear: 14100 }
    },
    "Nevada": {
        60: { percent: 0, fiveYear: 0, tenYear: 0, fifteenYear: 0 },
        65: { percent: 7, fiveYear: 700, tenYear: 1400, fifteenYear: 2100 },
        70: { percent: 12, fiveYear: 1200, tenYear: 2400, fifteenYear: 3600 },
        75: { percent: 18, fiveYear: 1800, tenYear: 3600, fifteenYear: 5400 },
        80: { percent: 24, fiveYear: 2400, tenYear: 4800, fifteenYear: 7200 },
        85: { percent: 28, fiveYear: 2800, tenYear: 5600, fifteenYear: 8400 },
        90: { percent: 32, fiveYear: 3200, tenYear: 6400, fifteenYear: 9600 },
        95: { percent: 35, fiveYear: 3500, tenYear: 7000, fifteenYear: 10500 },
        99: { percent: 38, fiveYear: 3800, tenYear: 7600, fifteenYear: 11400 }
    },
    "New Hampshire": {
        60: { percent: 0, fiveYear: 0, tenYear: 0, fifteenYear: 0 },
        65: { percent: 10, fiveYear: 1000, tenYear: 2000, fifteenYear: 3000 },
        70: { percent: 18, fiveYear: 1800, tenYear: 3600, fifteenYear: 5400 },
        75: { percent: 24, fiveYear: 2400, tenYear: 4800, fifteenYear: 7200 },
        80: { percent: 30, fiveYear: 3000, tenYear: 6000, fifteenYear: 9000 },
        85: { percent: 35, fiveYear: 3500, tenYear: 7000, fifteenYear: 10500 },
        90: { percent: 39, fiveYear: 3900, tenYear: 7800, fifteenYear: 11700 },
        95: { percent: 43, fiveYear: 4300, tenYear: 8600, fifteenYear: 12900 },
        99: { percent: 47, fiveYear: 4700, tenYear: 9400, fifteenYear: 14100 }
    },
    "New Jersey": {
        60: { percent: 0, fiveYear: 0, tenYear: 0, fifteenYear: 0 },
        65: { percent: 10, fiveYear: 1000, tenYear: 2000, fifteenYear: 3000 },
        70: { percent: 17, fiveYear: 1700, tenYear: 3400, fifteenYear: 5100 },
        75: { percent: 23, fiveYear: 2300, tenYear: 4600, fifteenYear: 6900 },
        80: { percent: 29, fiveYear: 2900, tenYear: 5800, fifteenYear: 8700 },
        85: { percent: 34, fiveYear: 3400, tenYear: 6800, fifteenYear: 10200 },
        90: { percent: 39, fiveYear: 3900, tenYear: 7800, fifteenYear: 11700 },
        95: { percent: 43, fiveYear: 4300, tenYear: 8600, fifteenYear: 12900 },
        99: { percent: 47, fiveYear: 4700, tenYear: 9400, fifteenYear: 14100 }
    },
    "New Mexico": {
        60: { percent: 0, fiveYear: 0, tenYear: 0, fifteenYear: 0 },
        65: { percent: 7, fiveYear: 700, tenYear: 1400, fifteenYear: 2100 },
        70: { percent: 12, fiveYear: 1200, tenYear: 2400, fifteenYear: 3600 },
        75: { percent: 18, fiveYear: 1800, tenYear: 3600, fifteenYear: 5400 },
        80: { percent: 24, fiveYear: 2400, tenYear: 4800, fifteenYear: 7200 },
        85: { percent: 28, fiveYear: 2800, tenYear: 5600, fifteenYear: 8400 },
        90: { percent: 32, fiveYear: 3200, tenYear: 6400, fifteenYear: 9600 },
        95: { percent: 35, fiveYear: 3500, tenYear: 7000, fifteenYear: 10500 },
        99: { percent: 38, fiveYear: 3800, tenYear: 7600, fifteenYear: 11400 }
    },
    "New York": {
        60: { percent: 0, fiveYear: 0, tenYear: 0, fifteenYear: 0 },
        65: { percent: 12, fiveYear: 1200, tenYear: 2400, fifteenYear: 3600 },
        70: { percent: 19, fiveYear: 1900, tenYear: 3800, fifteenYear: 5700 },
        75: { percent: 25, fiveYear: 2500, tenYear: 5000, fifteenYear: 7500 },
        80: { percent: 30, fiveYear: 3000, tenYear: 6000, fifteenYear: 9000 },
        85: { percent: 34, fiveYear: 3400, tenYear: 6800, fifteenYear: 10200 },
        90: { percent: 38, fiveYear: 3800, tenYear: 7600, fifteenYear: 11400 },
        95: { percent: 42, fiveYear: 4200, tenYear: 8400, fifteenYear: 12600 },
        99: { percent: 45, fiveYear: 4500, tenYear: 9000, fifteenYear: 13500 }
    },
    "North Carolina": {
        60: { percent: 0, fiveYear: 0, tenYear: 0, fifteenYear: 0 },
        65: { percent: 8, fiveYear: 800, tenYear: 1600, fifteenYear: 2400 },
        70: { percent: 14, fiveYear: 1400, tenYear: 2800, fifteenYear: 4200 },
        75: { percent: 20, fiveYear: 2000, tenYear: 4000, fifteenYear: 6000 },
        80: { percent: 25, fiveYear: 2500, tenYear: 5000, fifteenYear: 7500 },
        85: { percent: 29, fiveYear: 2900, tenYear: 5800, fifteenYear: 8700 },
        90: { percent: 33, fiveYear: 3300, tenYear: 6600, fifteenYear: 9900 },
        95: { percent: 37, fiveYear: 3700, tenYear: 7400, fifteenYear: 11100 },
        99: { percent: 40, fiveYear: 4000, tenYear: 8000, fifteenYear: 12000 }
    },
    "North Dakota": {
        60: { percent: 0, fiveYear: 0, tenYear: 0, fifteenYear: 0 },
        65: { percent: 10, fiveYear: 1000, tenYear: 2000, fifteenYear: 3000 },
        70: { percent: 17, fiveYear: 1700, tenYear: 3400, fifteenYear: 5100 },
        75: { percent: 23, fiveYear: 2300, tenYear: 4600, fifteenYear: 6900 },
        80: { percent: 29, fiveYear: 2900, tenYear: 5800, fifteenYear: 8700 },
        85: { percent: 34, fiveYear: 3400, tenYear: 6800, fifteenYear: 10200 },
        90: { percent: 39, fiveYear: 3900, tenYear: 7800, fifteenYear: 11700 },
        95: { percent: 43, fiveYear: 4300, tenYear: 8600, fifteenYear: 12900 },
        99: { percent: 47, fiveYear: 4700, tenYear: 9400, fifteenYear: 14100 }
    },
    "Ohio": {
        60: { percent: 0, fiveYear: 0, tenYear: 0, fifteenYear: 0 },
        65: { percent: 11, fiveYear: 1100, tenYear: 2200, fifteenYear: 3300 },
        70: { percent: 18, fiveYear: 1800, tenYear: 3600, fifteenYear: 5400 },
        75: { percent: 24, fiveYear: 2400, tenYear: 4800, fifteenYear: 7200 },
        80: { percent: 29, fiveYear: 2900, tenYear: 5800, fifteenYear: 8700 },
        85: { percent: 33, fiveYear: 3300, tenYear: 6600, fifteenYear: 9900 },
        90: { percent: 37, fiveYear: 3700, tenYear: 7400, fifteenYear: 11100 },
        95: { percent: 41, fiveYear: 4100, tenYear: 8200, fifteenYear: 12300 },
        99: { percent: 44, fiveYear: 4400, tenYear: 8800, fifteenYear: 13200 }
    },
    "Oklahoma": {
        60: { percent: 0, fiveYear: 0, tenYear: 0, fifteenYear: 0 },
        65: { percent: 9, fiveYear: 900, tenYear: 1800, fifteenYear: 2700 },
        70: { percent: 16, fiveYear: 1600, tenYear: 3200, fifteenYear: 4800 },
        75: { percent: 22, fiveYear: 2200, tenYear: 4400, fifteenYear: 6600 },
        80: { percent: 27, fiveYear: 2700, tenYear: 5400, fifteenYear: 8100 },
        85: { percent: 31, fiveYear: 3100, tenYear: 6200, fifteenYear: 9300 },
        90: { percent: 35, fiveYear: 3500, tenYear: 7000, fifteenYear: 10500 },
        95: { percent: 39, fiveYear: 3900, tenYear: 7800, fifteenYear: 11700 },
        99: { percent: 42, fiveYear: 4200, tenYear: 8400, fifteenYear: 12600 }
    },
    "Oregon": {
        60: { percent: 0, fiveYear: 0, tenYear: 0, fifteenYear: 0 },
        65: { percent: 7, fiveYear: 700, tenYear: 1400, fifteenYear: 2100 },
        70: { percent: 12, fiveYear: 1200, tenYear: 2400, fifteenYear: 3600 },
        75: { percent: 18, fiveYear: 1800, tenYear: 3600, fifteenYear: 5400 },
        80: { percent: 24, fiveYear: 2400, tenYear: 4800, fifteenYear: 7200 },
        85: { percent: 28, fiveYear: 2800, tenYear: 5600, fifteenYear: 8400 },
        90: { percent: 32, fiveYear: 3200, tenYear: 6400, fifteenYear: 9600 },
        95: { percent: 35, fiveYear: 3500, tenYear: 7000, fifteenYear: 10500 },
        99: { percent: 38, fiveYear: 3800, tenYear: 7600, fifteenYear: 11400 }
    },
    "Pennsylvania": {
        60: { percent: 0, fiveYear: 0, tenYear: 0, fifteenYear: 0 },
        65: { percent: 11, fiveYear: 1100, tenYear: 2200, fifteenYear: 3300 },
        70: { percent: 18, fiveYear: 1800, tenYear: 3600, fifteenYear: 5400 },
        75: { percent: 24, fiveYear: 2400, tenYear: 4800, fifteenYear: 7200 },
        80: { percent: 29, fiveYear: 2900, tenYear: 5800, fifteenYear: 8700 },
        85: { percent: 33, fiveYear: 3300, tenYear: 6600, fifteenYear: 9900 },
        90: { percent: 37, fiveYear: 3700, tenYear: 7400, fifteenYear: 11100 },
        95: { percent: 41, fiveYear: 4100, tenYear: 8200, fifteenYear: 12300 },
        99: { percent: 44, fiveYear: 4400, tenYear: 8800, fifteenYear: 13200 }
    },
    "Rhode Island": {
        60: { percent: 0, fiveYear: 0, tenYear: 0, fifteenYear: 0 },
        65: { percent: 10, fiveYear: 1000, tenYear: 2000, fifteenYear: 3000 },
        70: { percent: 17, fiveYear: 1700, tenYear: 3400, fifteenYear: 5100 },
        75: { percent: 23, fiveYear: 2300, tenYear: 4600, fifteenYear: 6900 },
        80: { percent: 29, fiveYear: 2900, tenYear: 5800, fifteenYear: 8700 },
        85: { percent: 34, fiveYear: 3400, tenYear: 6800, fifteenYear: 10200 },
        90: { percent: 39, fiveYear: 3900, tenYear: 7800, fifteenYear: 11700 },
        95: { percent: 43, fiveYear: 4300, tenYear: 8600, fifteenYear: 12900 },
        99: { percent: 47, fiveYear: 4700, tenYear: 9400, fifteenYear: 14100 }
    },
    "South Carolina": {
        60: { percent: 0, fiveYear: 0, tenYear: 0, fifteenYear: 0 },
        65: { percent: 7, fiveYear: 700, tenYear: 1400, fifteenYear: 2100 },
        70: { percent: 12, fiveYear: 1200, tenYear: 2400, fifteenYear: 3600 },
        75: { percent: 18, fiveYear: 1800, tenYear: 3600, fifteenYear: 5400 },
        80: { percent: 24, fiveYear: 2400, tenYear: 4800, fifteenYear: 7200 },
        85: { percent: 28, fiveYear: 2800, tenYear: 5600, fifteenYear: 8400 },
        90: { percent: 32, fiveYear: 3200, tenYear: 6400, fifteenYear: 9600 },
        95: { percent: 35, fiveYear: 3500, tenYear: 7000, fifteenYear: 10500 },
        99: { percent: 38, fiveYear: 3800, tenYear: 7600, fifteenYear: 11400 }
    },
    "South Dakota": {
        60: { percent: 0, fiveYear: 0, tenYear: 0, fifteenYear: 0 },
        65: { percent: 10, fiveYear: 1000, tenYear: 2000, fifteenYear: 3000 },
        70: { percent: 17, fiveYear: 1700, tenYear: 3400, fifteenYear: 5100 },
        75: { percent: 23, fiveYear: 2300, tenYear: 4600, fifteenYear: 6900 },
        80: { percent: 29, fiveYear: 2900, tenYear: 5800, fifteenYear: 8700 },
        85: { percent: 34, fiveYear: 3400, tenYear: 6800, fifteenYear: 10200 },
        90: { percent: 39, fiveYear: 3900, tenYear: 7800, fifteenYear: 11700 },
        95: { percent: 43, fiveYear: 4300, tenYear: 8600, fifteenYear: 12900 },
        99: { percent: 47, fiveYear: 4700, tenYear: 9400, fifteenYear: 14100 }
    },
    "Tennessee": {
        60: { percent: 0, fiveYear: 0, tenYear: 0, fifteenYear: 0 },
        65: { percent: 8, fiveYear: 800, tenYear: 1600, fifteenYear: 2400 },
        70: { percent: 14, fiveYear: 1400, tenYear: 2800, fifteenYear: 4200 },
        75: { percent: 20, fiveYear: 2000, tenYear: 4000, fifteenYear: 6000 },
        80: { percent: 25, fiveYear: 2500, tenYear: 5000, fifteenYear: 7500 },
        85: { percent: 29, fiveYear: 2900, tenYear: 5800, fifteenYear: 8700 },
        90: { percent: 33, fiveYear: 3300, tenYear: 6600, fifteenYear: 9900 },
        95: { percent: 37, fiveYear: 3700, tenYear: 7400, fifteenYear: 11100 },
        99: { percent: 40, fiveYear: 4000, tenYear: 8000, fifteenYear: 12000 }
    },
    "Texas": {
        60: { percent: 0, fiveYear: 0, tenYear: 0, fifteenYear: 0 },
        65: { percent: 7, fiveYear: 700, tenYear: 1400, fifteenYear: 2100 },
        70: { percent: 12, fiveYear: 1200, tenYear: 2400, fifteenYear: 3600 },
        75: { percent: 18, fiveYear: 1800, tenYear: 3600, fifteenYear: 5400 },
        80: { percent: 24, fiveYear: 2400, tenYear: 4800, fifteenYear: 7200 },
        85: { percent: 28, fiveYear: 2800, tenYear: 5600, fifteenYear: 8400 },
        90: { percent: 32, fiveYear: 3200, tenYear: 6400, fifteenYear: 9600 },
        95: { percent: 35, fiveYear: 3500, tenYear: 7000, fifteenYear: 10500 },
        99: { percent: 38, fiveYear: 3800, tenYear: 7600, fifteenYear: 11400 }
    },
    "Utah": {
        60: { percent: 0, fiveYear: 0, tenYear: 0, fifteenYear: 0 },
        65: { percent: 10, fiveYear: 1000, tenYear: 2000, fifteenYear: 3000 },
        70: { percent: 17, fiveYear: 1700, tenYear: 3400, fifteenYear: 5100 },
        75: { percent: 23, fiveYear: 2300, tenYear: 4600, fifteenYear: 6900 },
        80: { percent: 29, fiveYear: 2900, tenYear: 5800, fifteenYear: 8700 },
        85: { percent: 34, fiveYear: 3400, tenYear: 6800, fifteenYear: 10200 },
        90: { percent: 39, fiveYear: 3900, tenYear: 7800, fifteenYear: 11700 },
        95: { percent: 43, fiveYear: 4300, tenYear: 8600, fifteenYear: 12900 },
        99: { percent: 47, fiveYear: 4700, tenYear: 9400, fifteenYear: 14100 }
    },
    "Vermont": {
        60: { percent: 0, fiveYear: 0, tenYear: 0, fifteenYear: 0 },
        65: { percent: 12, fiveYear: 1200, tenYear: 2400, fifteenYear: 3600 },
        70: { percent: 18, fiveYear: 1800, tenYear: 3600, fifteenYear: 5400 },
        75: { percent: 24, fiveYear: 2400, tenYear: 4800, fifteenYear: 7200 },
        80: { percent: 29, fiveYear: 2900, tenYear: 5800, fifteenYear: 8700 },
        85: { percent: 33, fiveYear: 3300, tenYear: 6600, fifteenYear: 9900 },
        90: { percent: 37, fiveYear: 3700, tenYear: 7400, fifteenYear: 11100 },
        95: { percent: 41, fiveYear: 4100, tenYear: 8200, fifteenYear: 12300 },
        99: { percent: 44, fiveYear: 4400, tenYear: 8800, fifteenYear: 13200 }
    },
    "Virginia": {
        60: { percent: 0, fiveYear: 0, tenYear: 0, fifteenYear: 0 },
        65: { percent: 9, fiveYear: 900, tenYear: 1800, fifteenYear: 2700 },
        70: { percent: 16, fiveYear: 1600, tenYear: 3200, fifteenYear: 4800 },
        75: { percent: 22, fiveYear: 2200, tenYear: 4400, fifteenYear: 6600 },
        80: { percent: 27, fiveYear: 2700, tenYear: 5400, fifteenYear: 8100 },
        85: { percent: 31, fiveYear: 3100, tenYear: 6200, fifteenYear: 9300 },
        90: { percent: 35, fiveYear: 3500, tenYear: 7000, fifteenYear: 10500 },
        95: { percent: 39, fiveYear: 3900, tenYear: 7800, fifteenYear: 11700 },
        99: { percent: 42, fiveYear: 4200, tenYear: 8400, fifteenYear: 12600 }
    },
    "Washington": {
        60: { percent: 0, fiveYear: 0, tenYear: 0, fifteenYear: 0 },
        65: { percent: 7, fiveYear: 700, tenYear: 1400, fifteenYear: 2100 },
        70: { percent: 12, fiveYear: 1200, tenYear: 2400, fifteenYear: 3600 },
        75: { percent: 18, fiveYear: 1800, tenYear: 3600, fifteenYear: 5400 },
        80: { percent: 24, fiveYear: 2400, tenYear: 4800, fifteenYear: 7200 },
        85: { percent: 28, fiveYear: 2800, tenYear: 5600, fifteenYear: 8400 },
        90: { percent: 32, fiveYear: 3200, tenYear: 6400, fifteenYear: 9600 },
        95: { percent: 35, fiveYear: 3500, tenYear: 7000, fifteenYear: 10500 },
        99: { percent: 38, fiveYear: 3800, tenYear: 7600, fifteenYear: 11400 }
    },
    "West Virginia": {
        60: { percent: 0, fiveYear: 0, tenYear: 0, fifteenYear: 0 },
        65: { percent: 9, fiveYear: 900, tenYear: 1800, fifteenYear: 2700 },
        70: { percent: 16, fiveYear: 1600, tenYear: 3200, fifteenYear: 4800 },
        75: { percent: 22, fiveYear: 2200, tenYear: 4400, fifteenYear: 6600 },
        80: { percent: 27, fiveYear: 2700, tenYear: 5400, fifteenYear: 8100 },
        85: { percent: 31, fiveYear: 3100, tenYear: 6200, fifteenYear: 9300 },
        90: { percent: 35, fiveYear: 3500, tenYear: 7000, fifteenYear: 10500 },
        95: { percent: 39, fiveYear: 3900, tenYear: 7800, fifteenYear: 11700 },
        99: { percent: 42, fiveYear: 4200, tenYear: 8400, fifteenYear: 12600 }
    },
    "Wisconsin": {
        60: { percent: 0, fiveYear: 0, tenYear: 0, fifteenYear: 0 },
        65: { percent: 12, fiveYear: 1200, tenYear: 2400, fifteenYear: 3600 },
        70: { percent: 18, fiveYear: 1800, tenYear: 3600, fifteenYear: 5400 },
        75: { percent: 24, fiveYear: 2400, tenYear: 4800, fifteenYear: 7200 },
        80: { percent: 29, fiveYear: 2900, tenYear: 5800, fifteenYear: 8700 },
        85: { percent: 33, fiveYear: 3300, tenYear: 6600, fifteenYear: 9900 },
        90: { percent: 37, fiveYear: 3700, tenYear: 7400, fifteenYear: 11100 },
        95: { percent: 41, fiveYear: 4100, tenYear: 8200, fifteenYear: 12300 },
        99: { percent: 44, fiveYear: 4400, tenYear: 8800, fifteenYear: 13200 }
    },
    "Wyoming": {
        60: { percent: 0, fiveYear: 0, tenYear: 0, fifteenYear: 0 },
        65: { percent: 10, fiveYear: 1000, tenYear: 2000, fifteenYear: 3000 },
        70: { percent: 17, fiveYear: 1700, tenYear: 3400, fifteenYear: 5100 },
        75: { percent: 23, fiveYear: 2300, tenYear: 4600, fifteenYear: 6900 },
        80: { percent: 29, fiveYear: 2900, tenYear: 5800, fifteenYear: 8700 },
        85: { percent: 34, fiveYear: 3400, tenYear: 6800, fifteenYear: 10200 },
        90: { percent: 39, fiveYear: 3900, tenYear: 7800, fifteenYear: 11700 },
        95: { percent: 43, fiveYear: 4300, tenYear: 8600, fifteenYear: 12900 },
        99: { percent: 47, fiveYear: 4700, tenYear: 9400, fifteenYear: 14100 }
    }
};

// Función para cambiar las opciones del selector
function changeOptions() {
    // Verificar si el interruptor de refrigeración está marcado
    if (coolingSwitch.checked) {
        // Si está marcado, usar las opciones de afueValues
        updateOptions(savingsData);
    } else {
        // Si no está marcado, usar las opciones de savingsData
        updateOptions(afueValues);

    }
}

// Función para actualizar las opciones del selector
function updateOptions(data) {
    // Limpiar las opciones actuales
    stateSelect.innerHTML = "";

    // Agregar las nuevas opciones
    for (const state in data) {
        const option = document.createElement("option");
        option.text = state;
        stateSelect.add(option);
    }
}

// Función para calcular los Therms consumidos
function calculateThermsConsumed(afue) {
    return (BTU_INPUT / afue) / 100000;
}
// Función para calcular el costo de energía
function calculateEnergyCost(thermsConsumed, costPerTherm) {
    return thermsConsumed * costPerTherm;
}

// Función para calcular el ahorro anual
function calculateAnnualSavings(oldAFUE, newAFUE) {
    const thermsOld = calculateThermsConsumed(oldAFUE);
    const thermsNew = calculateThermsConsumed(newAFUE);

    const costOld = calculateEnergyCost(thermsOld, costPerTherm);
    const costNew = calculateEnergyCost(thermsNew, costPerTherm);

    return (costOld - costNew) * HOURS_PER_YEAR;
}


function updateSavings() {
    const oldAFUE = 70; // Suponemos que el AFUE de la caldera vieja es 70
    const annualSavings = calculateAnnualSavings(oldAFUE, currentAFUE);

    const fiveYearSavings = annualSavings * 5;
    const tenYearSavings = annualSavings * 10;
    const fifteenYearSavings = annualSavings * 15;

    // Actualizar los elementos del DOM con los valores calculados
    // fiveYearSavingsElement.innerText = `$${fiveYearSavings.toFixed(2)}`;
    // tenYearSavingsElement.innerText = `$${tenYearSavings.toFixed(2)}`;
    // fifteenYearSavingsElement.innerText = `$${fifteenYearSavings.toFixed(2)}`;

    anime({
        targets: { value: 0 },
        value: fiveYearSavings,
        easing: 'linear',
        round: 1,
        duration: 1100,
        update: function (anim) {
            fiveYearSavingsElement.innerHTML = `<span class="dollars">$</span>${anim.animatables[0].target.value}`;
        }
    });
    anime({
        targets: { value: 0 },
        value: tenYearSavings,
        easing: 'linear',
        round: 1,
        duration: 1100,
        update: function (anim) {
            tenYearSavingsElement.innerHTML = `<span class="dollars">$</span>${anim.animatables[0].target.value}`;
        }
    });
    anime({
        targets: { value: 0 },
        value: fifteenYearSavings,
        easing: 'linear',
        round: 1,
        duration: 1100,
        update: function (anim) {
            fifteenYearSavingsElement.innerHTML = `<span class="dollars">$</span>${anim.animatables[0].target.value}`;
        }
    });

    anime({
        targets: savingsFiveYearBar,
        width: `${fiveYearSavings / 100}%`,
        duration: 400,
        easing: 'linear',
    });
    anime({
        targets: savingsTenYearBar,
        width: `${tenYearSavings / 100}%`,
        duration: 500,
        easing: 'linear',
    });
    anime({
        targets: savingsFifteenYearBar,
        width: `${fifteenYearSavings / 100}%`,
        duration: 600,
        easing: 'linear',
    });
    // updateProgressBar(savings.percent.toFixed(2));
}

function getSavings(e, t) {
    let afueOld = 70; // Ejemplo de AFUE antiguo
    let afueNew = t;

    // Cálculo de Therms consumidos
    const thermsOld = (BTU_INPUT / afueOld) / 100000;
    const thermsNew = (BTU_INPUT / afueNew) / 100000;

    // Cálculo del costo de energía
    const costOld = thermsOld * costPerTherm;
    const costNew = thermsNew * costPerTherm;

    // Cálculo de ahorros anuales
    const annualSavings = (costOld - costNew) * 365; // Suponiendo uso diario

    // Cálculo de ahorros en 5, 10 y 15 años
    const fiveYearSavings = annualSavings * 5;
    const tenYearSavings = annualSavings * 10;
    const fifteenYearSavings = annualSavings * 15;

    // Actualizar la UI con los valores calculados
    return {
        percent: (afueNew - afueOld) / afueOld * 100,
        fiveYear: fiveYearSavings,
        tenYear: tenYearSavings,
        fifteenYear: fifteenYearSavings,
    };
}


function updateProgressBar(percent) {
    const dashArray = 883;
    const dashOffset = dashArray * (1 - percent / 100);
    anime({
        targets: progressBar,
        strokeDashoffset: dashOffset,
        easing: 'easeInOutSine',
        easing: 'spring(1, 80, 10, 0)',
        duration: 600,
    });
}

function interpolate(start, end, factor) {
    return Math.round(start + (end - start) * factor);
}

stateSelect.addEventListener('change', () => {
    updateSavings();
    console.log("updating");
});

costInput.addEventListener('input', function () {
    costPerTherm = parseFloat(this.value) || 1.50; // Actualizar el costo por Therm
    updateSavings(); // Recalcular los ahorros
});

changeOptions();

coolingSwitch.addEventListener('change', (e) => {
    changeOptions()
    if (coolingSwitch.checked) {
        calculator.classList.remove('heat');
        document.querySelector('#progress-bar-background').style.stroke = "#263846";
        coolingIcon.src = "/img/cool.svg"
        document.getElementById('number-rating').textContent = "10 "
    } else {
        calculator.classList.add('heat');
        document.querySelector('#progress-bar-background').style.stroke = "#4A1F1F";
        coolingIcon.src = "/img/heat.svg"
        document.getElementById('number-rating').textContent = "60 "
    }
    handle.text($("#sliderHandle").slider("value"));
});

function updateSpans(min, max, salt) {
    $(lengthSpans).empty();
    for (let i = min; i <= max; i += salt) {
        $(lengthSpans).append(`<span>${i}</span>`);
    }
}

$(function () {
    $("#sliderHandle").slider({
        min: 60,
        max: 95,
        value: 80,
        step: 1,
        range: 'min',
        create: function (event, ui) {
            handle.text($(this).slider("value"));
            // updateSpans($(this).slider("option", "min"), $(this).slider("option", "max"), 1);
            resize(x);
            updateSpans(60, 95, 5);
            updateSavings();
        },
        slide: function (event, ui) {
            currentAFUE = ui.value;
            handle.text(currentAFUE);
            updateSavings();
        },
    });
});

function resize(x) {
    if (x.matches) {
        savingsTitle.textContent = "SEE YOUR SAVINGS"
        return true;
    } else {
        savingsTitle.textContent = "SEE HOW MUCH YOU CAN SAVE"
        return false;
    }
}

resize(x);

x.addEventListener("change", function () {
    resize(x);
});


// workaround -  convert touch to mouse events
jQuery(document).on('touchstart', '#sliderHandle .ui-slider-handle', function (e) {
    let t = e.touches[0] || e;
    jQuery(this).addClass('ui-state-hover').addClass('ui-state-active').addClass('ui-state-focus')
    var newEvent = new MouseEvent('mousedown', {
        screenX: t.screenX, screenY: t.screenY,
        clientX: t.clientX, clientY: t.clientY,
        relatedTarget: t.target,
    })
    Object.defineProperty(newEvent, 'target', { value: t.target, enumerable: true });
    Object.defineProperty(newEvent, 'currentTarget', { value: t.target, enumerable: true });
    jQuery(this).parent().slider("instance")._mouseDown(newEvent)
});
jQuery(document).on('touchend', '#sliderHandle .ui-slider-handle', function (e) {
    let t = e.touches[0] || e;
    jQuery(this).removeClass('ui-state-hover').removeClass('ui-state-active').removeClass('ui-state-focus')
    var newEvent = new MouseEvent('mouseup', {
        screenX: t.screenX, screenY: t.screenY,
        clientX: t.clientX, clientY: t.clientY,
        relatedTarget: t.target,
    })
    Object.defineProperty(newEvent, 'target', { value: t.target, enumerable: true });
    Object.defineProperty(newEvent, 'currentTarget', { value: t.target, enumerable: true });
    jQuery(this).parent().slider("instance")._mouseUp(newEvent)
});
jQuery(document).on('touchmove', '#sliderHandle .ui-slider-handle', function (e) {
    let t = e.touches[0] || e;
    var newEvent = new MouseEvent('mousemove', {
        screenX: t.screenX, screenY: t.screenY,
        clientX: t.clientX, clientY: t.clientY,
        relatedTarget: t.target,
        'bubbles': true,
        'cancelable': true,
    });
    Object.defineProperty(newEvent, 'target', { value: t.target, enumerable: true });
    Object.defineProperty(newEvent, 'currentTarget', { value: t.target, enumerable: true });
    jQuery(this).parent().slider("instance")._mouseMove(newEvent);
});

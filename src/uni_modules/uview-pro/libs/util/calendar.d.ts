// Type definitions for calendar.js (农历/公历互转)
// Project: https://github.com/jjonline/calendar.js

export interface Solar2LunarResult {
    lYear: number; // 农历年
    lMonth: number; // 农历月
    lDay: number; // 农历日
    Animal: string; // 生肖
    IMonthCn: string; // 农历月中文
    IDayCn: string; // 农历日中文
    cYear: number; // 公历年
    cMonth: number; // 公历月
    cDay: number; // 公历日
    gzYear: string; // 干支年
    gzMonth: string; // 干支月
    gzDay: string; // 干支日
    isToday: boolean; // 是否今天
    isLeap: boolean; // 是否闰月
    nWeek: number; // 星期几（1-7，周一为1）
    ncWeek: string; // 星期几中文
    isTerm: boolean; // 是否节气
    Term: string | null; // 节气名
    astro: string; // 星座
}

export interface Lunar2SolarResult extends Solar2LunarResult {}

export interface Calendar {
    lunarInfo: number[];
    solarMonth: number[];
    Gan: string[];
    Zhi: string[];
    Animals: string[];
    solarTerm: string[];
    sTermInfo: string[];
    nStr1: string[];
    nStr2: string[];
    nStr3: string[];

    lYearDays(y: number): number;
    leapMonth(y: number): number;
    leapDays(y: number): number;
    monthDays(y: number, m: number): number;
    solarDays(y: number, m: number): number;
    toGanZhiYear(lYear: number): string;
    toAstro(cMonth: number, cDay: number): string;
    toGanZhi(offset: number): string;
    getTerm(y: number, n: number): number;
    toChinaMonth(m: number): string;
    toChinaDay(d: number): string;
    getAnimal(y: number): string;
    solar2lunar(y: number, m: number, d: number): Solar2LunarResult;
    lunar2solar(y: number, m: number, d: number, isLeapMonth?: boolean): Lunar2SolarResult;
}

declare const calendar: Calendar;
export default calendar;

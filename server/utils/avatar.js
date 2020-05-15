// random default avatar link
import random from './random';

const COLORS = [
  'A06A42',
  'C18D42',
  'FF4500',
  'FF8717',
  'FFB000',
  'FFD635',
  'DDBD37',
  'D4E815',
  '94E044',
  '46A508',
  '46D160',
  '0DD3BB',
  '25B79F',
  '008985',
  '24A0ED',
  '0079D3',
  '7193FF',
  '4856A3',
  '7E53C1',
  'FF66AC',
  'DB0064',
  'EA0027',
  'FF585B',
];

export default function gen() {
  let base = random.getRangeInt(1, 20);
  if (base < 10) {
    base = '0' + base;
  } else {
    base = base.toString();
  }
  const color = random.getArrayItem(COLORS);
  // 前端部分静态的默认头像地址
  return `/static/avatars/default_${base}_${color}.png`;
}

/**
 * 使用方法
 * import avatar from '../utils/avatar';
 * const url = avatar();
 */

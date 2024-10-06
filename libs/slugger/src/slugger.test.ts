import { describe, expect, it } from 'vitest';
import { Slugger } from './slugger';

describe(Slugger.name, () => {
  it.each([
    ['One', 'one'],
    ['one', 'one'],
    ['1', '1'],
    ['Short heading', 'short-heading'],
    [' Short heading', 'short-heading'],
    ['Short heading ', 'short-heading'],
    [' Short heading ', 'short-heading'],
    ['Number 1', 'number-1'],
    ['Ça va Gérôme ? Là ?', 'ca-va-gerome--la-'],
    ['A longer sentence to slug', 'a-longer-sentence-to-slug'],
    ['A longer sentence (to slug)', 'a-longer-sentence-to-slug'],
    ['A longer sentence [to slug]', 'a-longer-sentence-to-slug'],
    ['A longer (sentence) [to slug]', 'a-longer-sentence-to-slug'],
    ['A longer (sentence)[to slug]', 'a-longer-sentenceto-slug'],
    [
      'A longer <a href="http://example.com">sentence</a> to slug]',
      'a-longer-a-hrefhttpexamplecomsentencea-to-slug',
    ],
  ])('should make slug "%s" => "%s"', (input: string, output: string) => {
    const slugger = new Slugger();
    expect(slugger.slug(input)).toBe(output);
  });

  it('should make unique slug', () => {
    const slugger = new Slugger();
    const input = 'Foo';
    expect(slugger.slug(input)).toBe('foo');
    expect(slugger.slug(input)).toBe('foo-1');
    expect(slugger.slug(input)).toBe('foo-2');
    expect(slugger.slug(input)).toBe('foo-3');
    expect(slugger.slug(input)).toBe('foo-4');
  });

  it('should use given prefix', () => {
    const slugger = new Slugger('i-am-a-prefix-');
    const input = 'Foo';
    expect(slugger.slug(input)).toBe('i-am-a-prefix-foo');
  });
});

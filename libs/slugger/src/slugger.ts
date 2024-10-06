export class Slugger {
  private seen = new Map<string, number>();

  constructor(private prefix = '') {}

  slug(s: string): string {
    // naively generate the slug
    const naiveSlug = s
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLocaleLowerCase()
      .trim()
      .replaceAll(/[^\w\s]/gi, '')
      .replaceAll(/\s/gi, '-');
    // make it unique if needed
    const slug = (() => {
      const count = this.seen.get(naiveSlug);
      if (count != undefined) {
        this.seen.set(naiveSlug, count + 1);
        return naiveSlug + '-' + count;
      } else {
        this.seen.set(naiveSlug, 1);
        return naiveSlug;
      }
    })();
    // add the prefix
    return this.prefix + slug;
  }
}

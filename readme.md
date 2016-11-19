# one-time-event

Simple `EventSource`-like object which removes all handlers after it is fired.

## Usage

See [`demo.js`](https://github.com/c7hm4r/one-time-event/blob/master/demo.js).

Please avoid the following (in general):

    const e = newOneTimeEvent();
    e.pub.addHandler(e.fire);
    e.fire();

## Contribute

If you want to build the project or run the test, please replace `npm-shrinkwrap.json` by `npm-shrinkwrap.dev.json`. Then run `npm i` again.
It is a work around for the multiple problems npm currently has with its npm-shrinkwrap.json files and dev dependencies (https://github.com/npm/npm/issues/6298).

Build command: `npm run build`

Test command: `npm run test`

https://github.com/c7hm4r/one-time-event

Mirror: https://gitlab.com/cmueller/one-time-event

## License

> ISC License
> 
> Copyright (c) 2016, Christoph Müller
> 
> Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.
> 
> THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.

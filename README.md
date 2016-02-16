# Bible Verse Reference Finder

## Usage

**Find one reference**

```
var biblerefs = require('bible-ref-finder');

var finder = new biblerefs.RefFinder();
var ref = finder.findFirst('Some text with a reference like Gen 1:1-3 in it.');

if (ref) {
    // We found one!    
}
```

**Find all references**

```
var biblerefs = require('bible-ref-finder');

var onFound = function(ref) {
    
    // We found a ref!
    
    // Return false to cancel the iterator and stop searching the text.
    return true;
};

var finder = new biblerefs.RefFinder();
var anyFound = finder.findAll('Some text with references like Gen 1:1-3 and Exo 2:7 in it.');

if (anyFound) {
    // We found at least one reference!    
}
```

**Work with the reference**

Here are the properties you'll find on the ref results:

```
// ref = "Gen 1:2-3:4"

ref.bookId;       // The OSIS book ID. E.g., Gen
ref.startChapter; // 1
ref.startVerse;   // 2
ref.endChapter;   // 3
ref.endVerse;     // 4
```

## Compile using TypeScript

`tsc` or `tsc --watch`

## Run the tests

`npm test` or `mocha --watch ./js/*_tests.js`
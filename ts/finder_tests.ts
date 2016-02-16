/// <reference path="../typings/mocha/mocha.d.ts" />
import * as finder from './finder';

describe('BibleRefFinder', () => {
   var subject : finder.RefFinder;
   
   beforeEach(function() {
       subject = new finder.RefFinder();
   });
   
   describe('#findFirst', () => {
      it('just chapter', () => {
          var ref = subject.findFirst("genesis 1");
          assertNotNull(ref);
          assertEqual('Gen', ref.bookId);
          assertEqual(1, ref.startChapter);
          assertEqual(1, ref.endChapter);
      });
      
      it('chapter:verse', () => {
          var ref = subject.findFirst("genesis 1:2");
          assertNotNull(ref);
          assertEqual('Gen', ref.bookId);
          assertEqual(1, ref.startChapter);
          assertEqual(2, ref.startVerse);
          assertEqual(1, ref.endChapter);
          assertEqual(2, ref.endVerse);
      });
      
      it('chapter:verse-verse', () => {
          var ref = subject.findFirst("genesis 1:2-3");
          assertNotNull(ref);
          assertEqual('Gen', ref.bookId);
          assertEqual(1, ref.startChapter);
          assertEqual(2, ref.startVerse);
          assertEqual(1, ref.endChapter);
          assertEqual(3, ref.endVerse);
      });
      
      it('chapter:verse-chapter:verse', () => {
          var ref = subject.findFirst("genesis 1:2-3:4");
          assertNotNull(ref);
          assertEqual('Gen', ref.bookId);
          assertEqual(1, ref.startChapter);
          assertEqual(2, ref.startVerse);
          assertEqual(3, ref.endChapter);          
          assertEqual(4, ref.endVerse);
      });
   });
});

function assertNotNull(actual: any) {
    if (actual === undefined) {
        throw new Error(`Expected not null but was undefined.`);
    } else if (actual === null) {
        throw new Error(`Expected not null but was null.`);
    }
}

function assertEqual(expected: any, actual: any) {
    if (expected !== actual) {
        throw new Error(`Expected \"${expected}\" but was \"${actual}\".`);
    }
}

function assertTrue(actual: boolean) {
    assertEqual(true, actual);
}

function assertFalse(actual: boolean) {
    assertEqual(false, actual);
}
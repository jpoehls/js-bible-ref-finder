export class RefFinder {
    private books: BookInfo[];
    private lookup: {[abbr:string]: BookInfo};
    
    constructor() {
        this.books = [
            new BookInfo('Gen', 50, 'genesis', 'gen', 'ge')  
        ];
        
        // Populate our quick lookup table.
        this.lookup = {};
        for(var i in this.books) {
            for (var abbr in this.books[i].abbrs) {
                this.lookup[this.books[i].abbrs[abbr]] = this.books[i];
            }
        }
    }
    
    findFirst(text: string): Ref {
        var refFound: Ref;
        this.findAll(text, (ref) => {
            refFound = ref;
            return false;
        });
        return refFound;
    }
    
    findAll(text: string, onFound: (ref: Ref) => boolean): boolean {
        var words = text.split(/\s+/g);
        var anyFound = false;
        console.log("words are", words);
        
        var i = 0;
        while (i < words.length) {
            var word = words[i]; //hello
            console.log(`word, words[${i}] is "${word}"`);
            i++;
            
            var book = this.lookup[word.toLowerCase()];
            if (!book) {
                continue;
            }
            console.log(`found book: ${book.osisId}`);
            
            if (i >= words.length) {
                console.log(`no next word at ${i}! length is ${words.length}`);
                break; // no next word
            }
            var nextWord = words[i];
            console.log(`nextWord, words[${i}] is "${nextWord}"`);
            
            var start: string;
            var end: string;
            
            // Split a range like "1-2", "1:2-3", or "1:2-3:4".
            var betweens = nextWord.split('-', 2);
            console.log('betweens are', betweens);
            if (betweens.length === 1) {
                start = betweens[0];
                end = betweens[0];
            }
            else if (betweens.length === 2) {
                start = betweens[0];
                end = betweens[1];
            }
            else {
                continue;
            }
            
            var ref = new Ref();
            ref.bookId = book.osisId;
            
            var startColon = start.indexOf(':');
            var endColon = end.indexOf(':');
            console.log('startColon', startColon);
            console.log('endColon', endColon);
            
            if (startColon === -1 && endColon === -1) {
                // Try "1" or "1-2".
                console.log('trying "1" or "1-2"');
                
                ref.startChapter = parseInt(start, 10);
                console.log('startChapter', ref.startChapter);
                if (ref.startChapter === NaN ||
                    ref.startChapter < 1) {
                    continue;
                }
                
                ref.endChapter = parseInt(end, 10);
                console.log('endChapter', ref.endChapter);
                if (ref.endChapter === NaN ||
                    ref.endChapter < ref.startChapter) {
                        continue;
                }
            }
            else if (startColon === -1 && endColon === -1) {
                // Try "1:2-3:4".
                console.log('trying "1:2-3:4"');
                
                ref.startChapter = parseInt(start.split(':', 1)[0], 10);
                console.log('startChapter', ref.startChapter);
                if (ref.startChapter === NaN ||
                    ref.startChapter < 1) {
                    continue;
                }
                
                ref.startVerse = parseInt(start.split(':', 2)[1], 10);
                console.log('startVerse', ref.startVerse);
                if (ref.startVerse === NaN ||
                    ref.startVerse < 1) {
                    continue;
                }
                
                ref.endChapter = parseInt(end.split(':', 1)[0], 10);
                console.log('endChapter', ref.endChapter);
                if (ref.endChapter === NaN ||
                    ref.endChapter < 1 ||
                    ref.endChapter < ref.startChapter) {
                    continue;
                }
                
                ref.endVerse = parseInt(end.split(':', 2)[1], 10);
                console.log('endVerse', ref.endVerse);
                if (ref.endVerse === NaN ||
                    ref.endVerse < 1 ||
                    (ref.endChapter === ref.startChapter && ref.endVerse < ref.startVerse)) {
                    continue;
                }
            }
            else if (endColon > -1) {
                // Invalid.
                console.log('invalid reference range');
                continue;
            }
            else if (startColon > -1) {
                // Try "1:2-3".
                console.log('trying "1:2-3"');
                
                ref.startChapter = parseInt(start.split(':', 1)[0], 10);
                console.log('startChapter', ref.startChapter);
                if (ref.startChapter === NaN ||
                    ref.startChapter < 1) {
                    continue;
                }
                
                ref.startVerse = parseInt(start.split(':', 2)[1], 10);
                console.log('startVerse', ref.startVerse);
                if (ref.startVerse === NaN ||
                    ref.startVerse < 1) {
                    continue;
                }
                
                ref.endVerse = parseInt(end, 10);
                console.log('endVerse', ref.endVerse);
                if (ref.endVerse === NaN ||
                    ref.endVerse < ref.startVerse) {
                    continue;
                }
            }
                            
            anyFound = true;
            if (!onFound(ref)) {
                break;
            }
        }
        
        return anyFound;
    }
}

export class Ref {
    bookId: string;
    startChapter: number;
    endChapter: number;
    startVerse: number;
    endVerse: number;
}

class BookInfo {
    abbrs: string[];
    osisId: string;
    chapters: number;
    
    constructor(osisId: string, chapters: number, ...abbrs: string[]) {
        this.chapters = chapters;
        this.osisId = osisId;
        this.abbrs = abbrs;
    }
}
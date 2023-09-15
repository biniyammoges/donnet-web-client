export const joinFirstCharacters = (first: string = '', second: string = '') => {
     const firstLetterFirstName = first.charAt(0) ?? '';
     const firstLetterLastName = second.charAt(0) ?? '';
     const joinedLetters = firstLetterFirstName + firstLetterLastName;
     return joinedLetters?.toUpperCase();
}
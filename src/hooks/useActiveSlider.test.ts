import { getFinalData } from './useActiveSlides';

describe('getFinalData', () => {
  it('returns [] if data is null', () => {
    const input = null;
    const expectedResult: string[] = [];
    const result = getFinalData(input);
    expect(result).toStrictEqual(expectedResult);
  });
  it('returns [] if data is empty', () => {
    const input: any = {};
    const expectedResult: string[] = [];
    const result = getFinalData(input);
    expect(result).toStrictEqual(expectedResult);
  });
  it('returns [] if data.results is null', () => {
    const input: any = {results: null};
    const expectedResult: string[] = [];
    const result = getFinalData(input);
    expect(result).toStrictEqual(expectedResult);
  });
  it('returns [] if data.results is empty', () => {
    const input: any = {results: []};
    const expectedResult: string[] = [];
    const result = getFinalData(input);
    expect(result).toStrictEqual(expectedResult);
  });
  it('skips null results', ()=>{
    const input: any = {results: [null, {collectionName: 'asd'}]};
    const expectedResult: string[] = ['asd'];
    const result = getFinalData(input);
    expect(result).toStrictEqual(expectedResult);
  })
  it('skips results without collectionName', ()=>{
    const input: any = {results: [{something: 'else'}, {collectionName: 'asd'}]};
    const expectedResult: string[] = ['asd'];
    const result = getFinalData(input);
    expect(result).toStrictEqual(expectedResult);
  })
  it('skips already added collectionNames', ()=>{
    const input: any = {results: [{collectionName: 'asd'}, {collectionName: 'asd'}]};
    const expectedResult: string[] = ['asd'];
    const result = getFinalData(input);
    expect(result).toStrictEqual(expectedResult);
  })
  it('sorts results alphabetically', ()=>{
    const input: any = {results: [{collectionName: 'qwe'}, {collectionName: 'asd'}]};
    const expectedResult: string[] = ['asd', 'qwe'];
    const result = getFinalData(input);
    expect(result).toStrictEqual(expectedResult);
  })
});

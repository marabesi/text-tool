export interface MostFrequent {
    word: string
    count: number
    rank: number
}
export interface WordCountResult {
    listOfStrings: string[]
    sortByMostFrequent: MostFrequent[]
}
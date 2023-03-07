import ms from 'ms'

/**
 * @param time string. "1day", "1y"
 * @param format (60000, { long: true })          "1 minute"
            ms(2 * 60000, { long: true })         "2 minutes"
            ms(-3 * 60000, { long: true })        "-3 minutes"
            ms(ms('10 hours'), { long: true })    "10 hours" 
 * @returns number, 10000 millisec
 */
export const convertStringToMillisec = (time: string): number => {
   return ms(time)
}

/**
 * @param time number. 4342234
 * @param format (60000, { long: true })          "1 minute"
            ms(2 * 60000, { long: true })         "2 minutes"
            ms(-3 * 60000, { long: true })        "-3 minutes"
            ms(ms('10 hours'), { long: true })    "10 hours" 
 * @returns string, "28m"
 */
export const convertMillisecToString = (millisec: number, format: boolean = false): string => {
   return ms(millisec, { long: format })
}

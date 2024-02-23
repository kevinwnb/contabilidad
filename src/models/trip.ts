import { PayoutType } from "./types"
export default class Trip {
    id: number = 0
    userId: number = 0
    startLocation: string = ""
    endLocation: string = ""
    startDate: Date = new Date()
    endDate: Date = new Date()
    miles: number = 0
}
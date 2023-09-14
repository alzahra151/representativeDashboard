export interface Device {
    Device?: String,
    Quantity?: Number,
    SubTotalPrice?: Number
}
export interface Service {
    Service?: String,
    Devices?: [Device]
}
export interface PriceOffer {
    _id?: String,
    Services?: [Service],
    TotalPrice?: Number
}

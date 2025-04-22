export interface CardI {
    name: string
    adress: string
    uf: string
    municipality: string
    assessment: number
    description: string
    image: any
}

export interface DropDownI {
    optionOne: () => void
    optionTwo: () => void
    optionThree: () => void
}

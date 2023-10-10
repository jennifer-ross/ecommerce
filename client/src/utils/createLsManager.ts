class LocalStorageManager {
    private name: string

    constructor(name: string) {
        this.name = name
    }

    getValue(): string | null {
        return localStorage.getItem(this.name)
    }

    setValue(value: string): void {
        return localStorage.setItem(this.name, value)
    }
}

export const createLsManager = (name: string): LocalStorageManager =>
    new LocalStorageManager(name)

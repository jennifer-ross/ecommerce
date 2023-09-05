import { toUpper } from 'lodash'

export interface IRoleActionType {
    name: string
}

export const roleActionsTypes: IRoleActionType[] = [
    { name: 'READ' },
    { name: 'DELETE' },
    { name: 'EDIT' },
]

export const generateRoleActions = async (
    entities: any[],
): Promise<Map<string, string[]>> => {
    const roleActions: Map<string, string[]> = new Map<string, string[]>()

    entities.map<any>((entity: any) => {
        if (typeof entity !== 'object' && typeof entity !== 'function') {
            return
        }

        if (!entity.hasOwnProperty('name') || !entity.name) {
            return
        }

        const currentActions: string[] = []

        roleActionsTypes.map<any>((roleActionType: IRoleActionType) => {
            currentActions.push(
                `CAN_${roleActionType.name}_${toUpper(entity.name)}`,
            )
        })

        roleActions.set(entity.name, currentActions)
    })

    return roleActions
}

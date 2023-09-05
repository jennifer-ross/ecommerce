import { MigrationInterface } from 'mongo-migrate-ts'
import { Db, MongoClient } from 'mongodb'
import { User, UserCollectionName, UserModel } from '../models/user.schema'

export class UsersMigration implements MigrationInterface {
    async up(db: Db, client: MongoClient): Promise<any> {
        const session = client.startSession()
        try {
            await session.withTransaction(async () => {
                const collection = (await db.listCollections().toArray()).find(
                    (p) => p.name === UserCollectionName,
                )

                if (!collection) {
                    await db.createCollection(UserCollectionName)
                }

                // await db.collection<User>(UserCollectionName).insertOne({
                //     fullName: '1',
                //     password: '1',
                //     email: '',
                //     isValid: false,
                //     validateDate: null,
                //     createdDate: new Date(),
                //     updateDate: null,
                //     _id: null,
                // })
            })
        } finally {
            await session.endSession()
        }
    }

    async down(db: Db, client: MongoClient): Promise<any> {
        const session = client.startSession()
        try {
            await db.dropCollection(UserCollectionName)
        } finally {
            await session.endSession()
        }
    }
}

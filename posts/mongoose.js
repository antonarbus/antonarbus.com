'use client'


import { Code, H, Hs, LazyImg, Lnk, React, useEffect, useState, useRef, useCallback, useMemo, jsxToStr } from '/components/post/reExport'

const postObj = {
  title: 'mongoose',
  date: '2024.02.27',
  tags: ['db'],
  imgUrl: 'https://antonarbus.com/imgs/xxx.png',
  desc: 'mongoose for mongodb',
  body: (
    <>
      <H>About</H>

      <ul>
        <li>Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js</li>
        <li><Lnk path='https://mongoosejs.com/docs/index.html'>https://mongoosejs.com/docs/index.html</Lnk></li>
        <li><Code>npm install mongoose --save</Code></li>
      </ul>

      <H>Config</H>

      <Code block jsx>{`
        // connectToDb.ts
        import mongoose from 'mongoose'

        const mongoDbUrl = process.env.MONGO_DB_CONNECTION_STRING
        const db = 'q'
        
        export const connectToDb = async (): Promise<void> => {
          try {
            if (!mongoDbUrl) return
            mongoose.set('strictQuery', false)
            await mongoose.connect(\`\${mongoDbUrl}/\${db}\`)
            console.info('🚀 connected to db')
          } catch (error) {
            console.warn('💣 error on db connection')
            console.error(error)
          }
        }
      `}</Code>

      <Code block jsx>{`
        import 'dotenv/config'
        import express from 'express'
      
        import { connectToDb } from './db/connectToDb'
        import { errorHandlerMiddleware } from './middleware/errorHandlerMiddleware'
        import { multerMiddleware } from './middleware/multerMiddleware'
        import type { Req, Res } from './types'
        
        const app = express()
        void connectToDb()
        app.use(morgan('dev')) // http logs in terminal
        app.use(express.json()) // parses incoming requests with JSON because we use lots of json, let it be default
        app.use(cookieParser())
        app.use(cors())
        app.use(multerMiddleware.single('file'))
        app.set('trust proxy', true) // for app engine
        app.get(apiUrl.root, (_req: Req, res: Res) => res.send('i am express.js')
        app.use(errorHandlerMiddleware)
        
        const port = process.env.PORT_BACK_END
        const domain = process.env.DOMAIN
        // const tellServerStarted = (): void => { console.info(\`🚀 server started at \${domain}:\${port}\`) }
        app.listen(port, tellServerStarted)
      
      `}</Code>

      <H>schema and model</H>

      <Code block jsx>{`
        // userModel.ts
        // import type { HydratedDocumentFromSchema, InferSchemaType } from 'mongoose'
        import { model, Schema } from 'mongoose'
        
        // define schema for documents in collection
        const userSchema = new Schema({
          email: {
            type: String,
            required: [true, 'email is required'],
            unique: true,
            trim: true,
            match: /.+@.+\..+/,
          },
          password: {
            type: String,
            required: [true, 'password is required'],
            trim: true,
          },
          roles: {
            type: [String],
            default: ['user'],
          },
          isActivated: {
            type: Boolean,
            default: false,
          },
          activationLink: {
            type: String,
          },
          refreshJwtToken: {
            type: String,
          },
        }, {
          timestamps: true,
        })
        
        // define model - a class with which we construct documents
        // each document is a user with props as in schema
        // * "users" collection will be created automatically based on this model
        export const UserModel = model('user', userSchema)
        
        // Type of an hydrated document (with all the getters, etc...)
        // export type HydratedUserModel = HydratedDocumentFromSchema<typeof UserSchema>
        
        // Only the fields defined in the schema
        // export type UserModelProps = InferSchemaType<typeof UserSchema>
      `}</Code>

      <Code block jsx>{`
        // quotationModel.ts
        import { model, type ObjectId, Schema } from 'mongoose'
        import { customAlphabet } from 'nanoid'

        const nanoid = customAlphabet('123456789abcdefghijkmnpqrstuvwxyzABCDEFGHJKMNPQRSTUVWXYZ')

        export type QuotationModelType = {
          _id: ObjectId
          id: string
          email: string
          quotationName?: string
          createdAt: Date
          updatedAt: Date
          sharedAt?: Date
          from?: {
            email: string
            name: string
            company: string
          }
          to?: {
            email: string
            name: string
            company: string
          }
          version: number
        }

        const quotationSchema = new Schema<QuotationModelType>({
          id: {
            type: String,
            default: () => nanoid(5),
            required: true,
            unique: true,
            index: true,
          },
          email: {
            type: String,
            required: true,
            index: true,
            lowercase: true,
            trim: true,
          },
          quotationName: {
            type: String,
            trim: true,
          },
          createdAt: Date,
          updatedAt: Date,
          sharedAt: Date,
          from: {
            email: String,
            name: String,
            company: String,
          },
          to: {
            email: String,
            name: String,
            company: String,
          },
          version: {
            type: Number,
            default: 1,
            validate: (version: number) => version >= 0,
          },
        }, {
          timestamps: true,
        })

        export const QuotationModel = model<QuotationModelType>('quotation', quotationSchema)
      `}</Code>

      <H>Create document</H>

      <Code block jsx>{`
        // create document
        const dbRes = await QuotationModel.create({ email: 'mail@mail.com' })
    
        // create document with save
        const doc = new QuotationModel({ email: 'new@email.com' })
        const dbRes = await doc.save()
    
        // create multiple document at once
        const dbRes = await QuotationModel.create([
          { email: '1@mail.com' },
          { email: '2@mail.com' },
          { email: '3@mail.com' },
        ])
    
        // same, but faster, but has some drawback, which I did not get
        const dbRes = await QuotationModel.insertMany([
          { email: '10@mail.com' },
          { email: '20@mail.com' },
          { email: '30@mail.com' },
        ])

        const dbRes = await QuotationModel.find()
        res.json({ dbRes })
      `}</Code>

      <H>Get all documents</H>

      <Code block jsx>{`
        // get all documents
        const dbRes = await QuotationModel.find()
      `}</Code>

      <H>select</H>

      <Code block jsx>{`
        // do not show internal props _id __v
        const dbRes = await QuotationModel.find().select({ _id: 0, __v: 0 })
    
        // show only name & email
        const dbRes = await QuotationModel.find({}, 'name email')
        const dbRes = await QuotationModel.find().select({ name: 1, email: 1 })
    
        // same, but more readable, find docs with email, select 'name' + 'email' - '_id' fields, then execute the query
        const query = QuotationModel.find({ email: 'anton.arbus@gmail.com' })
        void query.select('name email -_id')
        const dbRes = await query.exec()
      `}</Code>

      <H>find</H>

      <Code block jsx>{`
        // docs with exact email value
        const dbRes = await UserModel.find({ email: 'anton.arbus@gmail.com' })
    
        // empty array is returned if no docs found
        const dbRes = await UserModel.find({ email: 'non existing email' })
    
        // may use RegExp
        const dbRes = await UserModel.find({ email: /^anton/ })
    
        // RegExp, same as above
        const dbRes = await UserModel.find({ email: { $regex: '^anton' } })
      `}</Code>

      <Code block jsx>{`
      // queries inside find
      const dbRes = await QuotationModel
        .find({
          email: /gmail/,
          id: /j/i,
          age: { $gt: 17, $lt: 66 },
          likes: { $in: ['vaporizing', 'talking'] },
        })
        .select({ id: true, email: 1, url: 1 })
      `}</Code>

      <Code block jsx>{`
      // queries inside find
      const dbRes = await QuotationModel
        .find({
          email: /gmail/,
          id: /j/i,
          age: { $gt: 17, $lt: 66 },
          likes: { $in: ['vaporizing', 'talking'] },
        })
        .select({ id: true, email: 1, url: 1 })
      `}</Code>

      <H>limit</H>

      <Code block jsx>{`
        const dbRes = await QuotationModel.find().limit(2)
      `}</Code>

      <H>sort</H>

      <Code block jsx>{`
        const dbRes = await QuotationModel.find().sort({ id: -1, url: 1 })
      `}</Code>

      <H>findOne</H>

      <Code block jsx>{`
      // first found document
      const dbRes = await QuotationModel.findOne()
  
      // first document with email
      const dbRes = await QuotationModel.findOne({ email: 'anton.arbus@gmail.com' })
      `}</Code>

      <H>where</H>

      <Code block jsx>{`
        // where
        const dbRes = await QuotationModel.find({ email: 'anton.arbus@gmail.com' }).where({ id: 'pEBgU' })

        // queries with where
        const dbRes = await QuotationModel
          .find({ email: /gmail/ })
          .where('id').equals(/j/i)
          .where('age').gt(17).lt(66)
          .where('likes').in(['vaporizing', 'talking'])
          .limit(2)
          .sort('+id')
          .select('id email url')
          .exec()
      `}</Code>

      <H>findById</H>

      <Code block jsx>{`
        // find by id
        const dbRes = await QuotationModel.findById('65dd14c495adae57a02a34ed')
      `}</Code>

      <H>findOneAndUpdate</H>

      <Code block jsx>{`
        // find & update, return not updated doc
        const filter = { email: 'anton.arbus@gmail.com', id: 'X4vjR' }
        const update = { url: 'updated url' }
        const dbRes = await QuotationModel.findOneAndUpdate(filter, update, {
          returnOriginal: true,
        })
    
        // find & update, return updated doc
        const filter = { email: 'anton.arbus@gmail.com', id: 'X4vjR' }
        const update = { url: 'brand new url' }
        const dbRes = await QuotationModel.findOneAndUpdate(filter, update, {
          returnOriginal: false,
          // new: true // same thing as returnOriginal: false
        })
      `}</Code>

      <H>findOne, modify, save</H>

      <Code block jsx>{`
          // find and update with save
          const document = await QuotationModel.findOne({ email: 'anton.arbus@gmail.com' }).where({ id: 'pAx6q' })
          if (document !== null) {
            document.url = 'new url'
            const dbRes = await document.save()
            res.json({ dbRes })
          }
      `}</Code>

      <H>findOneAndUpdate or insert</H>

      <Code block jsx>{`
          // find & update, if not found --> insert
          const filter = { email: 'anton.the.best@gmail.com' }
          const update = { quotationName: 'i am quotation' }
          const dbRes = await QuotationModel.findOneAndUpdate(filter, update, {
            new: true,
            setDefaultsOnInsert: true,
            upsert: true,
            includeResultMetadata: true,
          })
      `}</Code>

      <H>updateOne</H>

      <Code block jsx>{`
        // updateOne
        const dbRes = await QuotationModel.updateOne({ email: 'anton.arbus@gmail.com' }, { email: 'arbus.anton@gmail.com' })
      `}</Code>

      <H>updateMany</H>

      <Code block jsx>{`
        // update all
        const dbRes = await QuotationModel.updateMany({}, { version: 1 })
    
        // update version where email === 'anton.arbus@gmail.com'
        const dbRes = await QuotationModel.updateMany({ email: 'anton.arbus@gmail.com' }, { version: 2 })
    
        // update many documents
        const dbRes = await QuotationModel.updateMany({ email: 'anton.arbus@gmail.com' }, { $set: { url: 'some url' } })
      `}</Code>

      <H>deleteOne</H>

      <Code block jsx>{`
        // delete
        const dbRes = await QuotationModel.deleteOne({ email: 'anton.arbus@gmail.com' }).where({ id: 'pEBgU' })
      `}</Code>

      <H>deleteMany</H>

      <Code block jsx>{`
        // delete all docs where url === 'some url'
        const dbRes = await QuotationModel.deleteMany({ url: 'some url' })
      `}</Code>

      <H>lean</H>

      <Code block jsx>{`
        // return lean result, 5x smaller size, better for server
        // it does not support 1. change tracking 2. validation 3. getters and setters 4. virtuals 5. save()
        const dbRes = await QuotationModel.find().lean()
      `}</Code>

      <H>countDocuments</H>

      <Code block jsx>{`
            // count found documents
            const dbRes = await QuotationModel.find().countDocuments()
        
            // same, but faster
            const dbRes = await QuotationModel.find().estimatedDocumentCount()
      `}</Code>

      <H>exists</H>

      <Code block jsx>{`
        // returns doc id if it is found or null
        const dbRes = await QuotationModel.exists({ email: 'anton.arbus@gmail.comm' })
      `}</Code>

      <H>validate</H>

      <Code block jsx>{`
        // validate
        const document = await QuotationModel.findOne()
        if (document !== null) {
          // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
          const dbRes = await document.validate()
          res.json({ dbRes })
        }
      `}</Code>

      <H>explain</H>

      <Code block jsx>{`
        // explain - stats about how it executed a query
        const dbRes = await QuotationModel.find().explain()
      `}</Code>

      <H>populate</H>

      <Code block jsx>{`
        // The populate method is used to replace specified paths in a document 
        // with actual document(s) from another collection. 
        // This is useful when you have references between documents in different collections and 
        // you want to retrieve the referenced documents along with the original document in a single query.

        const mongoose = require('mongoose');

        const userSchema = new mongoose.Schema({
          username: String,
          email: String
        });

        const postSchema = new mongoose.Schema({
          title: String,
          content: String,
          author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
          }
        });

        const User = mongoose.model('User', userSchema);
        const Post = mongoose.model('Post', postSchema);

        Post.findOne({ title: 'Example Post' })
        .populate('author')
        .exec((err, post) => {
          if (err) throw err;
          console.log(post);
        });

      `}</Code>

      <H>operators</H>

      <Code block jsx>{`
      // Comparison Operators:
      const resEq = await Model.find({ field: { $eq: value } }); // Equal to a specified value
      const resNe = await Model.find({ field: { $ne: value } }); // Not equal to a specified value
      const resGt = await Model.find({ field: { $gt: value } }); // Greater than a specified value
      const resLt = await Model.find({ field: { $lt: value } }); // Less than a specified value
      const resGte = await Model.find({ field: { $gte: value } }); // Greater than or equal to a specified value
      const resLte = await Model.find({ field: { $lte: value } }); // Less than or equal to a specified value
      const resIn = await Model.find({ field: { $in: [value1, value2] } }); // Matches any value in an array
      const resNin = await Model.find({ field: { $nin: [value1, value2] } }); // Does not match any value in an array
      
      // Logical Operators:
      const resAnd = await Model.find({ $and: [ { condition1 }, { condition2 } ] }); // Logical AND
      const resOr = await Model.find({ $or: [ { condition1 }, { condition2 } ] }); // Logical OR
      const resNot = await Model.find({ field: { $not: { $eq: value } } }); // Inverted query expression
      
      // Element Operators:
      const resExists = await Model.find({ field: { $exists: true } }); // Field exists
      const resType = await Model.find({ field: { $type: 'string' } }); // Field is of specified type
      
      // Array Operators:
      const resAll = await Model.find({ field: { $all: [value1, value2] } }); // Matches arrays with all specified elements
      const resElemMatch = await Model.find({ field: { $elemMatch: { subfield: value } } }); // Matches arrays with at least one element meeting criteria
      
      // Regular Expression Operators:
      const resRegex = await Model.find({ field: { $regex: /pattern/ } }); // Matches using a regular expression
      
      // Geospatial Operators:
      const resGeoWithin = await Model.find({ location: { $geoWithin: { $geometry: { type: "Polygon", coordinates: [...] } } } }); // Within a specified shape
      const resGeoIntersects = await Model.find({ location: { $geoIntersects: { $geometry: { type: "Point", coordinates: [x, y] } } } }); // Intersects with a specified point
      
      // Text Search Operators:
      const resTextSearch = await Model.find({ $text: { $search: 'keyword' } }); // Text search for a keyword
      
      // Miscellaneous Operators:
      const resMod = await Model.find({ field: { $mod: [divisor, remainder] } }); // Modulo operation on field value
      const resWhere = await Model.find({ $where: 'this.field === value' }); // JavaScript expression-based query
      `}</Code>

      <H>methods for chaining query operators</H>

      <Code block jsx>{`
        // Comparison Operators:
        const resEq = await Model.find().where('field').equals(value); // Equal to a specified value
        const resNe = await Model.find().where('field').ne(value); // Not equal to a specified value
        const resGt = await Model.find().where('field').gt(value); // Greater than a specified value
        const resLt = await Model.find().where('field').lt(value); // Less than a specified value
        const resGte = await Model.find().where('field').gte(value); // Greater than or equal to a specified value
        const resLte = await Model.find().where('field').lte(value); // Less than or equal to a specified value
        const resIn = await Model.find().where('field').in([value1, value2]); // Matches any value in an array
        const resNin = await Model.find().where('field').nin([value1, value2]); // Does not match any value in an array
        
        // Logical Operators:
        const resAnd = await Model.find().and([ { condition1 }, { condition2 } ]); // Logical AND
        const resOr = await Model.find().or([ { condition1 }, { condition2 } ]); // Logical OR
        const resNot = await Model.find().where('field').not().equals(value); // Inverted query expression
        
        // Element Operators:
        const resExists = await Model.find().where('field').exists(); // Field exists
        const resType = await Model.find().where('field').type('string'); // Field is of specified type
        
        // Array Operators:
        const resAll = await Model.find().where('field').all([value1, value2]); // Matches arrays with all specified elements
        const resElemMatch = await Model.find().where('field').elemMatch({ subfield: value }); // Matches arrays with at least one element meeting criteria
        
        // Regular Expression Operators:
        const resRegex = await Model.find().where('field').regex(/pattern/); // Matches using a regular expression
        
        // Geospatial Operators:
        const resGeoWithin = await Model.find().where('location').geoWithin({ $geometry: { type: "Polygon", coordinates: [...] } }); // Within a specified shape
        const resGeoIntersects = await Model.find().where('location').geoIntersects({ $geometry: { type: "Point", coordinates: [x, y] } }); // Intersects with a specified point
        
        // Text Search Operators:
        const resTextSearch = await Model.find().text('keyword'); // Text search for a keyword
        
        // Miscellaneous Operators:
        const resMod = await Model.find().where('field').mod(divisor, remainder); // Modulo operation on field value
        const resWhere = await Model.find().where('field').equals(value); // JavaScript expression-based query
        
      `}</Code>

    </>
  )
}

export default postObj

export const post = {
  title: postObj.title,
  date: postObj.date,
  tags: postObj.tags,
  desc: postObj.desc,
  imgUrl: postObj.imgUrl || null,
  bodyStr: jsxToStr(postObj.body)
}

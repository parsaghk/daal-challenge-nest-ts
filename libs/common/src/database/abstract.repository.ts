import { AbstractDocument } from './abstract.schema';
import { Logger, NotFoundException } from '@nestjs/common';
import { FilterQuery, Model, SaveOptions, Types, UpdateQuery } from 'mongoose';

export abstract class AbstractRepository<TDocument extends AbstractDocument> {
  protected abstract logger: Logger;

  protected constructor(protected _model: Model<TDocument>) {}

  async create(
    document: Omit<TDocument, '_id'>,
    options?: SaveOptions,
  ): Promise<TDocument> {
    const createdDocument = new this._model({
      ...document,
      _id: new Types.ObjectId(),
    });
    return createdDocument
      .save(options)
      .then((res) => res.toJSON() as unknown as TDocument);
  }

  async findOneAndUpdate(
    filters: FilterQuery<TDocument>,
    update: UpdateQuery<TDocument>,
  ): Promise<TDocument> {
    const document = await this._model
      .findOneAndUpdate(filters, update, {
        new: true,
      })
      .lean<TDocument>(true);
    if (!document) {
      this.logger.warn('Document not found with filter query', filters);
      throw new NotFoundException();
    }
    return document;
  }

  async delete(filters: FilterQuery<TDocument>): Promise<void> {
    await this._model.deleteOne(filters);
  }

  find(filters: FilterQuery<TDocument>): Promise<TDocument[]> {
    return this._model.find(filters);
  }

  findOne(filter: FilterQuery<TDocument>): Promise<TDocument | null> {
    return this._model.findOne(filter, {}).lean<TDocument>(true);
  }

  async findOneOrFail(filter: FilterQuery<TDocument>): Promise<TDocument> {
    const document = await this._model.find(filter, {}).lean<TDocument>();
    if (!document) {
      throw new NotFoundException();
    }
    return document;
  }
}

import { IItemService } from '@/service/item/item.service.interface';
import {
  CreateItem,
  ItemParams,
  UpdateItem,
} from '@57eme-regiment/krang-api-contract';
import type { FastifyReply, FastifyRequest } from 'fastify';
import { inject, injectable } from 'tsyringe';

@injectable()
export class ItemController {
  constructor(
    @inject('IItemService')
    private readonly itemService: IItemService,
  ) {}

  async getAll(_req: FastifyRequest, reply: FastifyReply) {
    const items = await this.itemService.getAll();
    return reply.send(items);
  }

  async getById(
    req: FastifyRequest<{ Params: ItemParams }>,
    reply: FastifyReply,
  ) {
    const item = await this.itemService.getById(req.params.id);
    return reply.send(item);
  }

  async create(
    req: FastifyRequest<{ Body: CreateItem }>,
    reply: FastifyReply,
  ) {
    const item = await this.itemService.create(req.body);
    return reply.status(201).send(item);
  }

  async update(
    req: FastifyRequest<{ Params: ItemParams; Body: UpdateItem }>,
    reply: FastifyReply,
  ) {
    const item = await this.itemService.update(req.params.id, req.body);
    return reply.send(item);
  }

  async delete(
    req: FastifyRequest<{ Params: ItemParams }>,
    reply: FastifyReply,
  ) {
    await this.itemService.delete(req.params.id);
    return reply.status(204).send();
  }
}

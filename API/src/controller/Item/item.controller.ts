import {
  createItemSchema,
  itemParamsSchema,
  updateItemSchema,
} from '@/models/item/item.schema';
import { IItemService } from '@/service/item/item.service.interface';
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
    req: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply,
  ) {
    const { id } = itemParamsSchema.parse(req.params);
    const inventory = await this.itemService.getById(id);
    return reply.send(inventory);
  }

  async create(req: FastifyRequest, reply: FastifyReply) {
    const data = createItemSchema.parse(req.body);
    const inventory = await this.itemService.create(data);
    return reply.status(201).send(inventory);
  }

  async update(
    req: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply,
  ) {
    const { id } = itemParamsSchema.parse(req.params);
    const data = updateItemSchema.parse(req.body);
    const inventory = await this.itemService.update(id, data);
    return reply.send(inventory);
  }

  async delete(
    req: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply,
  ) {
    const { id } = itemParamsSchema.parse(req.params);
    await this.itemService.delete(id);
    return reply.status(204).send();
  }
}

import {
  createTownSchema,
  townParamsSchema,
  updateTownSchema,
} from '@/models/town/town.schema';
import { ITownService } from '@/service/town/town.service.interface';
import type { FastifyReply, FastifyRequest } from 'fastify';
import { inject, injectable } from 'tsyringe';

@injectable()
export class TownController {
  constructor(
    @inject('ITownService')
    private readonly townService: ITownService,
  ) {}

  async getAll(_req: FastifyRequest, reply: FastifyReply) {
    const towns = await this.townService.getAll();
    return reply.send(towns);
  }

  async getById(
    req: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply,
  ) {
    const { id } = townParamsSchema.parse(req.params);
    const town = await this.townService.getById(id);
    return reply.send(town);
  }

  async create(req: FastifyRequest, reply: FastifyReply) {
    const data = createTownSchema.parse(req.body);
    const town = await this.townService.create(data);
    return reply.status(201).send(town);
  }

  async update(
    req: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply,
  ) {
    const { id } = townParamsSchema.parse(req.params);
    const data = updateTownSchema.parse(req.body);
    const town = await this.townService.update(id, data);
    return reply.send(town);
  }

  async delete(
    req: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply,
  ) {
    const { id } = townParamsSchema.parse(req.params);
    await this.townService.delete(id);
    return reply.status(204).send();
  }
}

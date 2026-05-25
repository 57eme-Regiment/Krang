import { ITownService } from '@/service/town/town.service.interface';
import {
  CreateTown,
  TownParams,
  UpdateTown,
} from '@57em-regiment/krang-api-contract';
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
    req: FastifyRequest<{ Params: TownParams }>,
    reply: FastifyReply,
  ) {
    const town = await this.townService.getById(req.params.id);
    return reply.send(town);
  }

  async create(req: FastifyRequest<{ Body: CreateTown }>, reply: FastifyReply) {
    const town = await this.townService.create(req.body);
    return reply.status(201).send(town);
  }

  async createRange(
    req: FastifyRequest<{ Body: CreateTown[] }>,
    reply: FastifyReply,
  ) {
    const town = await this.townService.createRange(req.body);
    return reply.status(201).send(town);
  }

  async update(
    req: FastifyRequest<{ Params: TownParams; Body: UpdateTown }>,
    reply: FastifyReply,
  ) {
    const town = await this.townService.update(req.params.id, req.body);
    return reply.send(town);
  }

  async delete(
    req: FastifyRequest<{ Params: TownParams }>,
    reply: FastifyReply,
  ) {
    await this.townService.delete(req.params.id);
    return reply.status(204).send();
  }
}

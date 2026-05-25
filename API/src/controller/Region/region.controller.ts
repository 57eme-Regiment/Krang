import {
  createRegionSchema,
  regionParamsSchema,
  updateRegionSchema,
} from '@/models/region/region.schema';
import { IRegionService } from '@/service/region/region.service.interface';
import type { FastifyReply, FastifyRequest } from 'fastify';
import { inject, injectable } from 'tsyringe';

@injectable()
export class RegionController {
  constructor(
    @inject('IRegionService')
    private readonly regionService: IRegionService,
  ) {}

  async getAll(_req: FastifyRequest, reply: FastifyReply) {
    const regions = await this.regionService.getAll();
    return reply.send(regions);
  }

  async getById(
    req: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply,
  ) {
    const { id } = regionParamsSchema.parse(req.params);
    const region = await this.regionService.getById(id);
    return reply.send(region);
  }

  async create(req: FastifyRequest, reply: FastifyReply) {
    const data = createRegionSchema.parse(req.body);
    const region = await this.regionService.create(data);
    return reply.status(201).send(region);
  }

  async update(
    req: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply,
  ) {
    const { id } = regionParamsSchema.parse(req.params);
    const data = updateRegionSchema.parse(req.body);
    const region = await this.regionService.update(id, data);
    return reply.send(region);
  }

  async upsert(req: FastifyRequest, reply: FastifyReply) {
    const data = createRegionSchema.parse(req.body);
    const region = await this.regionService.upsert(data);
    return reply.send(region);
  }

  async delete(
    req: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply,
  ) {
    const { id } = regionParamsSchema.parse(req.params);
    await this.regionService.delete(id);
    return reply.status(204).send();
  }
}

import { IMaintenanceService } from '@/service/maintenance/maintenance.service.interface';
import type { FastifyReply, FastifyRequest } from 'fastify';
import { inject, injectable } from 'tsyringe';

@injectable()
export class MaintenanceController {
  constructor(
    @inject('IMaintenanceService')
    private readonly maintenanceService: IMaintenanceService,
  ) {}

  async renenutet(req: FastifyRequest, reply: FastifyReply) {
    await this.maintenanceService.renenutet();
    return reply.status(200).send();
  }
}

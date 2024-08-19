from odoo import models, fields, api


class CrmInherit(models.Model):
    _inherit = 'crm.lead'

    assigned_id = fields.Many2one('res.users', string="Assigned To")

    @api.model
    def get_assigned_lead_info(self):
        current_user_id = self.env.user.id
        leads = self.search([('assigned_id', '=', current_user_id)])
        lead_info = [
            {'name': lead.name, 'price': lead.expected_revenue, 'customer': lead.partner_id.name, 'leadId': lead.id} for
            lead in
            leads]
        print(lead_info)
        return lead_info


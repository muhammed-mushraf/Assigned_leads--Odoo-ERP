/** @odoo-module **/
import core from 'web.core';
import SystrayMenu from 'web.SystrayMenu';
import Widget from 'web.Widget';
import { session } from '@web/session';
var qweb = core.qweb;

const SystrayWidget = Widget.extend({
    template: 'IconSystrayDropdown',
    events: {
        'click .o-dropdown': '_onClick',
        'click .o_NotificationListItem': '_showLeadForm',
    },
    init: function (parent, options) {
        this._super.apply(this, arguments);
        // Call _updateSystrayDetails during initialization
        this._updateSystrayDetails();

        // Listen for document click event to close the dropdown
        $(document).on('click', this._onDocumentClick.bind(this));
    },
    _onClick: function (ev) {
        ev.preventDefault(); // Prevent the default action

        const dropBox = $(ev.currentTarget.parentElement).find('#systray_notif');
        dropBox.slideToggle();
        this._updateSystrayDetails();

        // Stop propagation to prevent document click event from being triggered immediately
        ev.stopPropagation();
    },
    _onDocumentClick: function (ev) {
        const dropBox = this.$el.find('#systray_notif');
        const isClickedInside = dropBox.is(ev.target) || dropBox.has(ev.target).length > 0;

        // Close the dropdown if clicked outside
        if (!isClickedInside) {
            dropBox.slideUp();
        }

        // Always trigger the update when the user clicks anywhere on the document
        this._updateSystrayDetails();
    },
    async _updateSystrayDetails() {
        const assignedLeadInfo = await this._rpc({
            model: 'crm.lead',
            method: 'get_assigned_lead_info',
        });

        // Update the badge with the count value
        this.$el.find('#systray_badge').text(assignedLeadInfo.length || 0);

        $('.systray_notification').html(qweb.render("SystrayDetails", {
            assigned_lead_info: assignedLeadInfo,
        }));
    },
    _showLeadForm: function (ev) {
        ev.preventDefault();

        const leadId = $(ev.currentTarget).data('lead-id');

        this.do_action({
            type: 'ir.actions.act_window',
            res_model: 'crm.lead',
            res_id: leadId,
            views: [[false, 'form']],
            target: 'current',
        });

        // Close the systray dropdown
        const dropBox = this.$el.find('#systray_notif');
        dropBox.slideUp();
    },
});

SystrayMenu.Items.push(SystrayWidget);

export default SystrayWidget;
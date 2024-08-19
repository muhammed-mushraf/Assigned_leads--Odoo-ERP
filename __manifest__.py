{
    'name': 'dgz Crm',
    'depends': ['base','crm'],
    'data': ['views/crm_inherit.xml'],
    'sequence': '1',
    'instalable': True,
    'application': True,
    'assets': {
            'web.assets_backend': ['dgz_crm/static/src/js/navbar.js',
                                   'dgz_crm/static/src/xml/navbar.xml',
                                   'dgz_crm/static/src/css/dig_systray.css']
        }
}
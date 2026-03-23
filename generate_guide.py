#!/usr/bin/env python3
"""Generate Edify PDF Guide: De oyentes a clientes"""

from reportlab.lib.pagesizes import letter
from reportlab.lib.units import inch, cm
from reportlab.lib.colors import HexColor, white, black
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_JUSTIFY
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, PageBreak,
    Table, TableStyle, Frame, PageTemplate, BaseDocTemplate
)
from reportlab.pdfgen import canvas
from reportlab.lib.utils import simpleSplit
import os

# Brand colors
EMERALD = HexColor("#059669")
EMERALD_LIGHT = HexColor("#D1FAE5")
EMERALD_DARK = HexColor("#047857")
DARK = HexColor("#111111")
GRAY = HexColor("#6B7280")
LIGHT_GRAY = HexColor("#F3F4F6")
MEDIUM_GRAY = HexColor("#9CA3AF")

OUTPUT_PATH = "/Users/brunoamoretti/Desktop/Edify/Web/Edify/public/guia-edify.pdf"
WIDTH, HEIGHT = letter

def draw_cover(c, doc):
    """Draw cover page"""
    w, h = WIDTH, HEIGHT

    # Full black background
    c.setFillColor(DARK)
    c.rect(0, 0, w, h, fill=1, stroke=0)

    # Edify brand name
    c.setFillColor(white)
    c.setFont("Helvetica-Bold", 28)
    c.drawString(60, h - 80, "Edify")

    c.setFont("Helvetica", 12)
    c.setFillColor(MEDIUM_GRAY)
    c.drawString(60, h - 100, "Podcast Strategy Agency")

    # Main title
    c.setFillColor(white)
    c.setFont("Helvetica-Bold", 42)
    title_lines = ["De oyentes", "a clientes."]
    y = h/2 + 100
    for line in title_lines:
        c.drawString(60, y, line)
        y -= 52

    # Subtitle
    c.setFont("Helvetica", 18)
    c.setFillColor(MEDIUM_GRAY)
    subtitle_lines = [
        "La anatomia de un podcast",
        "B2B que vende."
    ]
    y -= 20
    for line in subtitle_lines:
        c.drawString(60, y, line)
        y -= 26

    # Bottom tag
    c.setFillColor(white)
    c.setFont("Helvetica", 11)
    c.drawString(60, 60, "Guia gratuita por Edify")
    c.setFillColor(MEDIUM_GRAY)
    c.drawString(60, 42, "edifyclips.com")


def draw_page_bg(c, doc):
    """Standard page background with header"""
    w, h = WIDTH, HEIGHT

    # Top bar
    c.setFillColor(DARK)
    c.rect(0, h - 40, w, 40, fill=1, stroke=0)
    c.setFillColor(white)
    c.setFont("Helvetica-Bold", 9)
    c.drawString(40, h - 27, "EDIFY")
    c.setFont("Helvetica", 8)
    c.drawRightString(w - 40, h - 27, "De oyentes a clientes")

    # Page number
    c.setFillColor(MEDIUM_GRAY)
    c.setFont("Helvetica", 9)
    c.drawCentredString(w/2, 30, str(doc.page))


def draw_section_header(story, number, title, styles):
    """Draw a section header with number accent"""
    story.append(Spacer(1, 10))
    story.append(Paragraph(
        f'<font color="#111111" size="14">{number}</font>',
        styles['section_number']
    ))
    story.append(Spacer(1, 4))
    story.append(Paragraph(title, styles['heading']))
    # Black line
    story.append(Spacer(1, 8))
    tbl = Table([['']],colWidths=[80], rowHeights=[3])
    tbl.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (0,0), DARK),
        ('LINEBELOW', (0,0), (0,0), 0, white),
    ]))
    story.append(tbl)
    story.append(Spacer(1, 16))


def draw_stat_box(value, label):
    """Create a stat highlight box"""
    data = [[
        Paragraph(f'<font color="#111111" size="22"><b>{value}</b></font>',
                  ParagraphStyle('stat', alignment=TA_CENTER, spaceAfter=2)),
    ], [
        Paragraph(f'<font color="#6B7280" size="9">{label}</font>',
                  ParagraphStyle('statlabel', alignment=TA_CENTER)),
    ]]
    tbl = Table(data, colWidths=[140], rowHeights=[35, 25])
    tbl.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), LIGHT_GRAY),
        ('ALIGN', (0,0), (-1,-1), 'CENTER'),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('ROUNDEDCORNERS', [8,8,8,8]),
        ('TOPPADDING', (0,0), (-1,-1), 8),
        ('BOTTOMPADDING', (0,0), (-1,-1), 8),
    ]))
    return tbl


def draw_bullet(story, text, styles):
    story.append(Paragraph(f'<font color="#111111">&#8226;</font>  {text}', styles['bullet']))
    story.append(Spacer(1, 4))


def draw_quote_box(story, text, styles):
    """Highlight/quote box"""
    data = [[Paragraph(f'<i><font color="#047857">{text}</font></i>', styles['body_center'])]]
    tbl = Table(data, colWidths=[440])
    tbl.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), EMERALD_LIGHT),
        ('TOPPADDING', (0,0), (-1,-1), 16),
        ('BOTTOMPADDING', (0,0), (-1,-1), 16),
        ('LEFTPADDING', (0,0), (-1,-1), 20),
        ('RIGHTPADDING', (0,0), (-1,-1), 20),
        ('ROUNDEDCORNERS', [10,10,10,10]),
    ]))
    story.append(tbl)
    story.append(Spacer(1, 12))


def draw_multiplier_diagram(story, styles):
    """Create the content multiplier diagram"""
    # Center column
    center_style = ParagraphStyle('diag', fontName='Helvetica-Bold', fontSize=9,
                                   alignment=TA_CENTER, textColor=white)
    gray_style = ParagraphStyle('diaggray', fontName='Helvetica', fontSize=8,
                                 alignment=TA_CENTER, textColor=DARK)

    items = [
        ("1 Episodio\nde 40 min", EMERALD_DARK),
    ]

    # Arrow down
    story.append(Spacer(1, 8))

    # Main box
    data_main = [[Paragraph('<font size="11"><b>1 Episodio de 40 minutos</b></font>',
                             ParagraphStyle('x', alignment=TA_CENTER, textColor=white))]]
    tbl_main = Table(data_main, colWidths=[200], rowHeights=[40])
    tbl_main.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (0,0), DARK),
        ('ALIGN', (0,0), (0,0), 'CENTER'),
        ('VALIGN', (0,0), (0,0), 'MIDDLE'),
        ('ROUNDEDCORNERS', [8,8,8,8]),
    ]))
    story.append(tbl_main)
    story.append(Spacer(1, 6))
    story.append(Paragraph('<font color="#111111" size="16">&#9660;</font>',
                           ParagraphStyle('arrow', alignment=TA_CENTER)))
    story.append(Spacer(1, 6))

    # Output items in a grid
    outputs = [
        ("1 Episodio\ncompleto", "YouTube + Spotify"),
        ("3-5 Clips\nverticales", "Reels, TikTok, Shorts"),
        ("5-10 Quotes\nvisuales", "Instagram, LinkedIn"),
        ("1-2 Threads\nescritos", "X (Twitter)"),
        ("1 Newsletter", "Email marketing"),
        ("1 Blog post\nSEO", "Sitio web"),
    ]

    row1_data = []
    row2_data = []
    for title, subtitle in outputs[:3]:
        cell = Paragraph(f'<font size="9"><b>{title}</b></font><br/><font size="7" color="#6B7280">{subtitle}</font>',
                        ParagraphStyle('cell', alignment=TA_CENTER, textColor=DARK, leading=12))
        row1_data.append(cell)
    for title, subtitle in outputs[3:]:
        cell = Paragraph(f'<font size="9"><b>{title}</b></font><br/><font size="7" color="#6B7280">{subtitle}</font>',
                        ParagraphStyle('cell2', alignment=TA_CENTER, textColor=DARK, leading=12))
        row2_data.append(cell)

    tbl_out = Table([row1_data, row2_data], colWidths=[150, 150, 150], rowHeights=[55, 55])
    tbl_out.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), LIGHT_GRAY),
        ('ALIGN', (0,0), (-1,-1), 'CENTER'),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('GRID', (0,0), (-1,-1), 1, white),
        ('TOPPADDING', (0,0), (-1,-1), 8),
        ('BOTTOMPADDING', (0,0), (-1,-1), 8),
        ('ROUNDEDCORNERS', [8,8,8,8]),
    ]))
    story.append(tbl_out)
    story.append(Spacer(1, 8))

    # Result
    data_result = [[Paragraph(
        '<font size="10" color="#111111"><b>= 10-15 piezas de contenido por semana</b></font>',
        ParagraphStyle('res', alignment=TA_CENTER))]]
    tbl_res = Table(data_result, colWidths=[350], rowHeights=[35])
    tbl_res.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (0,0), LIGHT_GRAY),
        ('ALIGN', (0,0), (0,0), 'CENTER'),
        ('VALIGN', (0,0), (0,0), 'MIDDLE'),
        ('ROUNDEDCORNERS', [8,8,8,8]),
    ]))
    story.append(tbl_res)


def draw_cta_page(c, doc):
    """Final CTA page"""
    w, h = WIDTH, HEIGHT

    # Background
    c.setFillColor(DARK)
    c.rect(0, 0, w, h, fill=1, stroke=0)

    # Content
    c.setFillColor(white)
    c.setFont("Helvetica-Bold", 14)
    c.drawCentredString(w/2, h - 180, "EDIFY")

    c.setFillColor(white)
    c.setFont("Helvetica-Bold", 36)
    lines = ["Listo para convertir", "tu podcast en tu mejor", "maquina de ventas?"]
    y = h/2 + 80
    for line in lines:
        c.drawCentredString(w/2, y, line)
        y -= 44

    # CTA text
    y -= 30
    c.setFillColor(MEDIUM_GRAY)
    c.setFont("Helvetica", 14)
    c.drawCentredString(w/2, y, "Visita edifyclips.com y agenda")
    y -= 22
    c.drawCentredString(w/2, y, "tu llamada estrategica gratuita.")

    # Contact info
    c.setFillColor(white)
    c.setFont("Helvetica-Bold", 12)
    c.drawCentredString(w/2, 100, "edifyclips.com")
    c.setFillColor(MEDIUM_GRAY)
    c.setFont("Helvetica", 10)
    c.drawCentredString(w/2, 78, "Podcast Strategy Agency")

    # Page number
    c.setFont("Helvetica", 9)
    c.drawCentredString(w/2, 30, str(doc.page))


def build_pdf():
    """Build the complete PDF"""

    # Styles
    styles = {}
    styles['heading'] = ParagraphStyle(
        'heading', fontName='Helvetica-Bold', fontSize=22,
        textColor=DARK, leading=28, spaceAfter=6
    )
    styles['subheading'] = ParagraphStyle(
        'subheading', fontName='Helvetica-Bold', fontSize=14,
        textColor=DARK, leading=20, spaceAfter=8, spaceBefore=14
    )
    styles['body'] = ParagraphStyle(
        'body', fontName='Helvetica', fontSize=10.5,
        textColor=GRAY, leading=17, spaceAfter=8, alignment=TA_JUSTIFY
    )
    styles['body_center'] = ParagraphStyle(
        'body_center', fontName='Helvetica', fontSize=10.5,
        textColor=GRAY, leading=17, spaceAfter=8, alignment=TA_CENTER
    )
    styles['bullet'] = ParagraphStyle(
        'bullet', fontName='Helvetica', fontSize=10.5,
        textColor=GRAY, leading=17, leftIndent=16, spaceAfter=2, alignment=TA_LEFT
    )
    styles['section_number'] = ParagraphStyle(
        'section_number', fontName='Helvetica-Bold', fontSize=14,
        textColor=DARK, leading=16
    )
    styles['bold_body'] = ParagraphStyle(
        'bold_body', fontName='Helvetica-Bold', fontSize=10.5,
        textColor=DARK, leading=17, spaceAfter=8
    )

    story = []

    # ===================== PAGE 1: COVER (handled by template) =====================
    story.append(Spacer(1, 1))  # Cover content drawn by template
    story.append(PageBreak())

    # ===================== PAGE 2: INTRO =====================
    draw_section_header(story, "01", "El podcast como maquina de autoridad", styles)

    story.append(Paragraph(
        "En un mundo saturado de contenido, los fundadores y marcas B2B enfrentan un desafio clave: "
        "<b>como posicionarse como la referencia indiscutible de su industria</b>. La respuesta no esta "
        "en publicar mas, sino en publicar con sistema.",
        styles['body']
    ))
    story.append(Spacer(1, 8))

    story.append(Paragraph(
        "El podcast se ha convertido en la herramienta mas poderosa para construir autoridad porque combina "
        "tres elementos que ningun otro formato ofrece al mismo tiempo:",
        styles['body']
    ))

    draw_bullet(story, "<b>Profundidad:</b> Permite desarrollar ideas complejas en 30-60 minutos, algo imposible en un post de redes.", styles)
    draw_bullet(story, "<b>Confianza:</b> La voz genera una conexion intima. Tu audiencia siente que te conoce personalmente.", styles)
    draw_bullet(story, "<b>Escalabilidad:</b> Un solo episodio se puede transformar en decenas de piezas de contenido para distintas plataformas.", styles)

    story.append(Spacer(1, 12))

    # Stats row
    stats = Table([[
        draw_stat_box("546M+", "oyentes de podcasts\nen el mundo (2025)"),
        draw_stat_box("72%", "escuchan un episodio\ncompleto"),
        draw_stat_box("3x", "mas probabilidad de\ncompra post-podcast"),
    ]], colWidths=[155, 155, 155])
    stats.setStyle(TableStyle([
        ('ALIGN', (0,0), (-1,-1), 'CENTER'),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ]))
    story.append(stats)
    story.append(Spacer(1, 16))

    draw_quote_box(story,
        "La diferencia entre 'tener un podcast' y 'tener un sistema de contenido basado en podcast' "
        "es la diferencia entre hablar al vacio y construir un negocio.", styles)

    story.append(Paragraph(
        "En LATAM, el consumo de podcasts crecio un 30% interanual. Las marcas que entiendan esto hoy "
        "tendran una ventaja competitiva enorme sobre las que lleguen tarde.",
        styles['body']
    ))

    story.append(PageBreak())

    # ===================== PAGE 3-4: VIRAL POTENTIAL =====================
    draw_section_header(story, "02", "El potencial viral de los podcasts", styles)

    story.append(Paragraph(
        "La mayoria de los creadores y marcas cometen el mismo error: graban un episodio, lo suben a Spotify "
        "y esperan que \"algo pase\". <b>La viralidad no es suerte. Es sistema de distribucion.</b>",
        styles['body']
    ))
    story.append(Spacer(1, 8))

    story.append(Paragraph("El efecto multiplicador", styles['subheading']))
    story.append(Paragraph(
        "Un solo episodio de 40 minutos, procesado con la estrategia correcta, puede generar entre "
        "10 y 15 piezas de contenido unicas. Esto significa que con solo 4 episodios al mes, "
        "tenes contenido profesional para alimentar todas tus plataformas durante 30 dias.",
        styles['body']
    ))
    story.append(Spacer(1, 10))

    # Multiplier diagram
    draw_multiplier_diagram(story, styles)

    story.append(Spacer(1, 16))

    story.append(Paragraph("La viralidad es un sistema, no un golpe de suerte", styles['subheading']))
    story.append(Paragraph(
        "Cada pieza de contenido tiene un objetivo especifico dentro del embudo de conversion:",
        styles['body']
    ))

    draw_bullet(story, "<b>Clips verticales</b> en Reels/TikTok/Shorts: capturan atencion y atraen nuevos seguidores.", styles)
    draw_bullet(story, "<b>Episodio completo</b> en YouTube/Spotify: construye confianza y profundidad.", styles)
    draw_bullet(story, "<b>Quotes y carruseles</b> en Instagram/LinkedIn: refuerzan tu posicionamiento.", styles)
    draw_bullet(story, "<b>Threads en X:</b> amplifican ideas clave y generan debate.", styles)
    draw_bullet(story, "<b>Newsletter + Blog:</b> nutren a tu audiencia existente y mejoran tu SEO.", styles)

    story.append(Spacer(1, 10))
    draw_quote_box(story,
        "No necesitas crear mas contenido. Necesitas un sistema que multiplique "
        "el contenido que ya creas.", styles)

    story.append(PageBreak())

    # ===================== PAGE 5-6: VIDEO > AUDIO =====================
    draw_section_header(story, "03", "Video > Audio: por que tu podcast necesita video", styles)

    story.append(Paragraph(
        "Si tu podcast es solo audio, estas dejando sobre la mesa el 80% de su potencial de alcance. "
        "Y no es una opinion: es lo que dicen los datos.",
        styles['body']
    ))
    story.append(Spacer(1, 8))

    story.append(Paragraph("YouTube ya es el player #1 de podcasts", styles['subheading']))
    story.append(Paragraph(
        "En 2024, YouTube supero a Spotify y Apple Podcasts como la plataforma mas usada para consumir "
        "podcasts. Esto significa que si no tenes version en video de tu podcast, "
        "directamente no existis para la mayor parte de la audiencia.",
        styles['body']
    ))
    story.append(Spacer(1, 8))

    # Comparison table
    comp_header_style = ParagraphStyle('ch', fontName='Helvetica-Bold', fontSize=9,
                                        textColor=white, alignment=TA_CENTER)
    comp_cell_style = ParagraphStyle('cc', fontName='Helvetica', fontSize=9,
                                      textColor=DARK, alignment=TA_CENTER, leading=13)

    comp_data = [
        [Paragraph('<b>Metrica</b>', comp_header_style),
         Paragraph('<b>Solo Audio</b>', comp_header_style),
         Paragraph('<b>Audio + Video</b>', comp_header_style)],
        [Paragraph('Engagement promedio', comp_cell_style),
         Paragraph('Medio', comp_cell_style),
         Paragraph('<b>3x mayor</b>', comp_cell_style)],
        [Paragraph('Alcance potencial', comp_cell_style),
         Paragraph('Spotify + Apple', comp_cell_style),
         Paragraph('<b>+ YouTube, Reels,\nTikTok, Shorts</b>', comp_cell_style)],
        [Paragraph('Clips virales', comp_cell_style),
         Paragraph('Audiogramas\n(bajo impacto)', comp_cell_style),
         Paragraph('<b>Video clips\n(alto impacto)</b>', comp_cell_style)],
        [Paragraph('Conexion emocional', comp_cell_style),
         Paragraph('Solo voz', comp_cell_style),
         Paragraph('<b>Voz + expresion\nfacial + lenguaje\ncorporal</b>', comp_cell_style)],
    ]

    comp_table = Table(comp_data, colWidths=[140, 130, 160])
    comp_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), DARK),
        ('BACKGROUND', (0,1), (-1,-1), LIGHT_GRAY),
        ('ALIGN', (0,0), (-1,-1), 'CENTER'),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('GRID', (0,0), (-1,-1), 1, white),
        ('TOPPADDING', (0,0), (-1,-1), 8),
        ('BOTTOMPADDING', (0,0), (-1,-1), 8),
        ('ROUNDEDCORNERS', [8,8,8,8]),
    ]))
    story.append(comp_table)
    story.append(Spacer(1, 16))

    story.append(Paragraph("El poder del lenguaje no verbal", styles['subheading']))
    story.append(Paragraph(
        "Cuando tu audiencia te ve hablar con pasion sobre tu industria, se genera un nivel de confianza "
        "que el audio solo no puede replicar. Las expresiones faciales, los gestos, el contacto visual "
        "con la camara: todo suma para posicionarte como alguien real, accesible y experto.",
        styles['body']
    ))
    story.append(Spacer(1, 8))

    story.append(Paragraph("Los clips verticales son el motor de crecimiento", styles['subheading']))
    story.append(Paragraph(
        "Los formatos cortos verticales (Reels, TikTok, YouTube Shorts) son los que realmente viralizan "
        "tu contenido y atraen audiencia nueva. Pero para que funcionen, <b>necesitan video</b>. "
        "Un audiograma con una onda de sonido simplemente no compite con un clip donde se ve "
        "al speaker transmitiendo una idea con intensidad.",
        styles['body']
    ))
    story.append(Spacer(1, 8))

    draw_quote_box(story,
        "El video no es un 'nice to have'. Es el canal principal de distribucion. "
        "Sin video, tu podcast es invisible para la mayoria de tu audiencia potencial.", styles)

    story.append(PageBreak())

    # ===================== PAGE 7-8: ENTREVISTAS PLANEADAS =====================
    draw_section_header(story, "04", "La estrategia de entrevistas planeadas", styles)

    story.append(Paragraph(
        "Uno de los mayores frenos para mantener un podcast activo es la logistica de invitados. "
        "\"No consigo agendar entrevistas\", \"Se me cancelo el invitado\", \"No tengo contactos "
        "suficientes\". Estos problemas son reales, pero tienen una solucion que muy pocos conocen.",
        styles['body']
    ))
    story.append(Spacer(1, 10))

    story.append(Paragraph("La solucion: entrevistas planeadas con tu propio equipo", styles['subheading']))
    story.append(Paragraph(
        "No necesitas depender de invitados externos para tener un podcast de alto valor. "
        "Las entrevistas planeadas son sesiones estrategicamente disenadas donde grabas "
        "conversaciones con:",
        styles['body']
    ))

    draw_bullet(story, "<b>Miembros de tu equipo</b> que dominan un tema especifico de tu industria.", styles)
    draw_bullet(story, "<b>Socios estrategicos</b> que complementan tu experiencia.", styles)
    draw_bullet(story, "<b>Clientes actuales</b> que pueden compartir casos de exito reales.", styles)
    draw_bullet(story, "<b>Tu mismo</b>, respondiendo preguntas frecuentes de tu audiencia en formato conversacional.", styles)

    story.append(Spacer(1, 10))

    story.append(Paragraph("Como funciona en la practica", styles['subheading']))

    # Process steps
    steps = [
        ("1", "Planificacion estrategica",
         "Definimos los temas clave de tu nicho y armamos un calendario de contenido mensual."),
        ("2", "Sesion de grabacion",
         "Coordinamos sesiones de grabacion con los participantes. Nuestro equipo prepara las preguntas y la estructura."),
        ("3", "Produccion profesional",
         "Editamos cada sesion para producir episodios de podcast de alta calidad en audio y video."),
        ("4", "Distribucion multiplataforma",
         "El contenido se distribuye como episodios completos, clips verticales, quotes y material para newsletter."),
    ]

    for num, title, desc in steps:
        step_data = [[
            Paragraph(f'<font color="#FFFFFF" size="14"><b>{num}</b></font>',
                     ParagraphStyle('sn', alignment=TA_CENTER, textColor=white)),
            Paragraph(f'<b>{title}</b><br/><font color="#6B7280" size="9">{desc}</font>',
                     ParagraphStyle('sd', fontName='Helvetica', fontSize=10, textColor=DARK, leading=14)),
        ]]
        step_table = Table(step_data, colWidths=[45, 400])
        step_table.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (0,0), DARK),
            ('BACKGROUND', (1,0), (1,0), LIGHT_GRAY),
            ('ALIGN', (0,0), (0,0), 'CENTER'),
            ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
            ('TOPPADDING', (0,0), (-1,-1), 10),
            ('BOTTOMPADDING', (0,0), (-1,-1), 10),
            ('LEFTPADDING', (1,0), (1,0), 14),
            ('ROUNDEDCORNERS', [8,8,8,8]),
        ]))
        story.append(step_table)
        story.append(Spacer(1, 6))

    story.append(Spacer(1, 12))

    story.append(Paragraph("Beneficio adicional: posiciona a todo tu equipo", styles['subheading']))
    story.append(Paragraph(
        "Las entrevistas planeadas no solo resuelven el problema de la falta de invitados. "
        "Tambien posicionan a los miembros de tu equipo como expertos visibles de tu marca. "
        "Esto genera confianza en tus clientes potenciales, que ven que detras de tu empresa "
        "hay un equipo de personas con conocimiento real.",
        styles['body']
    ))
    story.append(Spacer(1, 8))

    draw_quote_box(story,
        "No necesitas ser famoso para tener un podcast de valor. "
        "Necesitas un sistema y un equipo que te respalde.", styles)

    story.append(PageBreak())

    # ===================== PAGE 9: SISTEMA EDIFY =====================
    draw_section_header(story, "05", "El sistema Edify en accion", styles)

    story.append(Paragraph(
        "En Edify no somos una fabrica de edicion. Somos tu equipo estrategico de contenido. "
        "Nos encargamos de todo el ecosistema para que tu unica tarea sea grabar.",
        styles['body']
    ))
    story.append(Spacer(1, 12))

    # Service cards
    services = [
        ("4 Podcasts al mes",
         "Edicion profesional de audio y video enfocada en retencion y claridad del mensaje."),
        ("3-5 Clips verticales por episodio",
         "Extraemos los momentos de mayor impacto para Reels, TikTok y Shorts. Disenados para viralizar autoridad."),
        ("Optimizacion estrategica",
         "Show notes, titulos SEO y ganchos psicologicos disenados para convertir oyentes en clientes."),
        ("Estrategia de distribucion",
         "No solo editamos. Te decimos donde, cuando y como publicar cada pieza para maximizar resultados."),
    ]

    for title, desc in services:
        svc_data = [[
            Paragraph(f'<font color="#111111">&#10003;</font>',
                     ParagraphStyle('chk', fontSize=16, alignment=TA_CENTER, textColor=DARK)),
            Paragraph(f'<b>{title}</b><br/><font color="#6B7280" size="9">{desc}</font>',
                     ParagraphStyle('svcd', fontName='Helvetica', fontSize=10.5, textColor=DARK, leading=14)),
        ]]
        svc_table = Table(svc_data, colWidths=[40, 420])
        svc_table.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (-1,-1), LIGHT_GRAY),
            ('VALIGN', (0,0), (-1,-1), 'TOP'),
            ('TOPPADDING', (0,0), (-1,-1), 12),
            ('BOTTOMPADDING', (0,0), (-1,-1), 12),
            ('LEFTPADDING', (0,0), (0,0), 10),
            ('LEFTPADDING', (1,0), (1,0), 10),
            ('ROUNDEDCORNERS', [8,8,8,8]),
        ]))
        story.append(svc_table)
        story.append(Spacer(1, 6))

    story.append(Spacer(1, 14))

    story.append(Paragraph("Diferencial Edify", styles['subheading']))

    diff_data = [[Paragraph(
        '<font color="#047857"><b>No trabajamos mas de un episodio a la vez por cliente.</b><br/>'
        'Enfoque boutique. Calidad maxima garantizada.</font>',
        ParagraphStyle('diff', fontName='Helvetica', fontSize=10.5, textColor=EMERALD_DARK,
                       alignment=TA_CENTER, leading=16))]]
    diff_table = Table(diff_data, colWidths=[440])
    diff_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (0,0), EMERALD_LIGHT),
        ('TOPPADDING', (0,0), (0,0), 16),
        ('BOTTOMPADDING', (0,0), (0,0), 16),
        ('LEFTPADDING', (0,0), (0,0), 20),
        ('RIGHTPADDING', (0,0), (0,0), 20),
        ('ROUNDEDCORNERS', [10,10,10,10]),
    ]))
    story.append(diff_table)
    story.append(Spacer(1, 16))

    story.append(Spacer(1, 8))

    # CTA box
    cta_data = [[Paragraph(
        '<font color="#047857"><b>Agenda una llamada estrategica gratuita</b><br/>'
        'y descubri como Edify puede transformar tu podcast en un sistema de ventas.</font>',
        ParagraphStyle('cta_inner', fontName='Helvetica', fontSize=11, textColor=EMERALD_DARK,
                       alignment=TA_CENTER, leading=18))]]
    cta_table = Table(cta_data, colWidths=[440])
    cta_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (0,0), EMERALD_LIGHT),
        ('TOPPADDING', (0,0), (0,0), 20),
        ('BOTTOMPADDING', (0,0), (0,0), 20),
        ('LEFTPADDING', (0,0), (0,0), 24),
        ('RIGHTPADDING', (0,0), (0,0), 24),
        ('ROUNDEDCORNERS', [10,10,10,10]),
    ]))
    story.append(cta_table)

    story.append(PageBreak())

    # ===================== PAGE 10: CTA (handled by template) =====================
    story.append(Spacer(1, 1))

    # Build document
    doc = BaseDocTemplate(
        OUTPUT_PATH,
        pagesize=letter,
        leftMargin=50,
        rightMargin=50,
        topMargin=70,
        bottomMargin=60,
    )

    # Define page templates
    frame = Frame(
        doc.leftMargin, doc.bottomMargin,
        doc.width, doc.height,
        id='normal'
    )

    cover_template = PageTemplate(id='cover', frames=[frame], onPage=draw_cover)
    normal_template = PageTemplate(id='normal', frames=[frame], onPage=draw_page_bg)
    cta_template = PageTemplate(id='cta', frames=[frame], onPage=draw_cta_page)

    doc.addPageTemplates([cover_template, normal_template, cta_template])

    # Insert template switches
    from reportlab.platypus.doctemplate import NextPageTemplate

    final_story = []
    # Page 1: Cover
    final_story.append(NextPageTemplate('normal'))
    final_story.append(story[0])  # spacer
    final_story.append(story[1])  # page break

    # Pages 2-9: Normal content
    for item in story[2:-2]:
        final_story.append(item)

    # Last page break + CTA
    final_story.append(NextPageTemplate('cta'))
    final_story.append(story[-2])  # page break or spacer
    final_story.append(story[-1])  # spacer

    doc.build(final_story)
    print(f"PDF generated at: {OUTPUT_PATH}")
    print(f"File size: {os.path.getsize(OUTPUT_PATH) / 1024:.1f} KB")


if __name__ == "__main__":
    build_pdf()

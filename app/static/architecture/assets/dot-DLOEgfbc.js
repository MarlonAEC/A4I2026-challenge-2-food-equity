var e=e=>{switch(e){case`index`:return`digraph {
    graph [TBbalance=min,
        bgcolor=transparent,
        compound=true,
        fontname=Arial,
        fontsize=20,
        labeljust=l,
        labelloc=t,
        layout=dot,
        likec4_viewId=index,
        nodesep=1.528,
        outputorder=nodesfirst,
        pad=0.209,
        rankdir=TB,
        ranksep=1.667,
        splines=spline
    ];
    node [color="#2563eb",
        fillcolor="#3b82f6",
        fontcolor="#eff6ff",
        fontname=Arial,
        label="\\N",
        penwidth=0,
        shape=rect,
        style=filled
    ];
    edge [arrowsize=0.75,
        color="#8D8D8D",
        fontcolor="#C9C9C9",
        fontname=Arial,
        fontsize=14,
        penwidth=2,
        style=""
    ];
    donor [color="#475569",
        fillcolor="#64748b",
        fontcolor="#f8fafc",
        height=2.5,
        label=<<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">Food Donor</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#cbd5e1">Grocers, restaurants, and farmers offering<BR/>surplus food on tight expiration clocks.</FONT></TD></TR></TABLE>>,
        likec4_id=donor,
        likec4_level=0,
        margin="0.223,0.223",
        width=4.445];
    broker [height=2.5,
        label=<<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">Food Equity &amp; Surplus Broker</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#bfdbfe">Real-time broker matching perishable surplus<BR/>with verified community pantries under tight<BR/>clocks.</FONT></TD></TR></TABLE>>,
        likec4_id=broker,
        likec4_level=0,
        margin="0.223,0.223",
        width=4.445];
    donor -> broker [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">Submits surplus offer with deadline<BR/>clock</FONT></TD></TR></TABLE>>,
        likec4_id="75ocq9",
        minlen=1,
        style=dashed];
    coordinator [color="#475569",
        fillcolor="#64748b",
        fontcolor="#f8fafc",
        height=2.5,
        label=<<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">Rescue Coordinator</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#cbd5e1">Dispatchers overseeing food matching,<BR/>resolving declines, and reviewing equity<BR/>briefs.</FONT></TD></TR></TABLE>>,
        likec4_id=coordinator,
        likec4_level=0,
        margin="0.223,0.223",
        width=4.445];
    coordinator -> broker [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">Reviews match brief, inspects decoys,<BR/>and triggers dispatches</FONT></TD></TR></TABLE>>,
        likec4_id="7e6rsj",
        minlen=1,
        style=dashed];
    pantry [color="#475569",
        fillcolor="#64748b",
        fontcolor="#f8fafc",
        height=2.5,
        label=<<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">Pantry Volunteer</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#cbd5e1">Pantry coordinators and shelter operators<BR/>receiving dispatches and onboarding capacity.</FONT></TD></TR></TABLE>>,
        likec4_id=pantry,
        likec4_level=0,
        margin="0.223,0.223",
        width=4.445];
    pantry -> broker [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">Onboards new pantry via conversational<BR/>interview</FONT></TD></TR></TABLE>>,
        likec4_id="1wm6iyx",
        minlen=1,
        style=dashed];
    driver [color="#475569",
        fillcolor="#64748b",
        fontcolor="#f8fafc",
        height=2.5,
        label=<<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">Delivery Driver</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#cbd5e1">Volunteer drivers picking up surplus from<BR/>donor docks and delivering to pantries.</FONT></TD></TR></TABLE>>,
        likec4_id=driver,
        likec4_level=0,
        margin="0.223,0.223",
        width=4.445];
    driver -> broker [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">Receives turn-by-turn routing and pickup<BR/>alerts</FONT></TD></TR></TABLE>>,
        likec4_id="1lqpxw7",
        minlen=1,
        style=dashed];
    gemini [color="#475569",
        fillcolor="#64748b",
        fontcolor="#f8fafc",
        height=2.5,
        label=<<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">Google Gemini (Vertex AI)</FONT></TD></TR><TR><TD><FONT POINT-SIZE="13" COLOR="#cbd5e1">Gemini 2.5/3.8 Flash, Vertex AI</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#cbd5e1">Foundation LLM providing multi-step<BR/>reasoning, match-brief synthesis, and<BR/>conversational intake.</FONT></TD></TR></TABLE>>,
        likec4_id=gemini,
        likec4_level=0,
        margin="0.223,0.223",
        width=4.445];
    broker -> gemini [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14"><B>[...]</B></FONT></TD></TR><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="12">[ gRPC / HTTPS ]</FONT></TD></TR></TABLE>>,
        likec4_id="1l4etm0",
        minlen=1,
        style=dashed];
    openfda [color="#475569",
        fillcolor="#64748b",
        fontcolor="#f8fafc",
        height=2.5,
        label=<<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">openFDA Food Safety API</FONT></TD></TR><TR><TD><FONT POINT-SIZE="13" COLOR="#cbd5e1">REST API, api.fda.gov</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#cbd5e1">Federal enforcement feed screening surplus<BR/>food for active recalls and undeclared<BR/>allergens.</FONT></TD></TR></TABLE>>,
        likec4_id=openfda,
        likec4_level=0,
        margin="0.223,0.223",
        width=4.445];
    broker -> openfda [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">Screens food description for active<BR/>recalls</FONT></TD></TR><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="12">[ HTTPS REST ]</FONT></TD></TR></TABLE>>,
        likec4_id=n3p7ge,
        minlen=1,
        style=dashed];
    "chicago-traffic" [color="#475569",
        fillcolor="#64748b",
        fontcolor="#f8fafc",
        height=2.5,
        label=<<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">City of Chicago Traffic Tracker</FONT></TD></TR><TR><TD><FONT POINT-SIZE="13" COLOR="#cbd5e1">Civic Open Data API / OSRM</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#cbd5e1">Live congestion and arterial traffic speed<BR/>feed for transit ETA calculations.</FONT></TD></TR></TABLE>>,
        likec4_id="chicago-traffic",
        likec4_level=0,
        margin="0.223,0.223",
        width=4.445];
    broker -> "chicago-traffic" [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">Retrieves live street congestion speeds</FONT></TD></TR><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="12">[ HTTPS REST ]</FONT></TD></TR></TABLE>>,
        likec4_id=jwmcip,
        minlen=1,
        style=dashed];
    "osm-tiles" [color="#475569",
        fillcolor="#64748b",
        fontcolor="#f8fafc",
        height=2.5,
        label=<<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">OpenStreetMap Tile Service</FONT></TD></TR><TR><TD><FONT POINT-SIZE="13" COLOR="#cbd5e1">Leaflet CDN</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#cbd5e1">Map tile provider rendering Chicago<BR/>geospatial layers, tracts, and pantry pins.</FONT></TD></TR></TABLE>>,
        likec4_id="osm-tiles",
        likec4_level=0,
        margin="0.223,0.223",
        width=4.445];
    broker -> "osm-tiles" [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">Fetches Chicago map tiles</FONT></TD></TR><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="12">[ HTTPS ]</FONT></TD></TR></TABLE>>,
        likec4_id="17twz8y",
        minlen=1,
        style=dashed];
}
`;case`containers`:return`digraph {
    graph [TBbalance=min,
        bgcolor=transparent,
        compound=true,
        fontname=Arial,
        fontsize=20,
        labeljust=l,
        labelloc=t,
        layout=dot,
        likec4_viewId=containers,
        nodesep=1.528,
        outputorder=nodesfirst,
        pad=0.209,
        rankdir=TB,
        ranksep=1.667,
        splines=spline
    ];
    node [color="#2563eb",
        fillcolor="#3b82f6",
        fontcolor="#eff6ff",
        fontname=Arial,
        label="\\N",
        penwidth=0,
        shape=rect,
        style=filled
    ];
    edge [arrowsize=0.75,
        color="#8D8D8D",
        fontcolor="#C9C9C9",
        fontname=Arial,
        fontsize=14,
        penwidth=2,
        style=""
    ];
    subgraph cluster_broker {
        graph [color="#1b3d88",
            fillcolor="#194b9e",
            label=<<FONT POINT-SIZE="11" COLOR="#bfdbfeb3"><B>FOOD EQUITY &amp; SURPLUS BROKER</B></FONT>>,
            likec4_depth=1,
            likec4_id=broker,
            likec4_level=0,
            margin=40,
            style=filled
        ];
        "web-ui" [color="#4f46e5",
            fillcolor="#6366f1",
            fontcolor="#eef2ff",
            height=2.5,
            label=<<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">RescueDispatch Web Console</FONT></TD></TR><TR><TD><FONT POINT-SIZE="13" COLOR="#c7d2fe">HTML5, Leaflet.js, CSS3</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#c7d2fe">Interactive console featuring 1-click<BR/>scenarios, live Chicago map, 7-part match<BR/>briefs, and smartphone SMS simulator.</FONT></TD></TR></TABLE>>,
            likec4_id="broker.web-ui",
            likec4_level=1,
            margin="0.223,0.223",
            width=4.445];
        "api-backend" [color="#4f46e5",
            fillcolor="#6366f1",
            fontcolor="#eef2ff",
            height=2.5,
            label=<<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">FastAPI Dispatch Service</FONT></TD></TR><TR><TD><FONT POINT-SIZE="13" COLOR="#c7d2fe">Python 3.11, FastAPI, Uvicorn</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#c7d2fe">REST API handling match requests, fallback<BR/>cascading, live equity audits, and pantry<BR/>onboarding.</FONT></TD></TR></TABLE>>,
            likec4_id="broker.api-backend",
            likec4_level=1,
            margin="0.223,0.223",
            width=4.445];
        "agent-engine" [color="#4f46e5",
            fillcolor="#6366f1",
            fontcolor="#eef2ff",
            height=2.5,
            label=<<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">ADK Agent Reasoning Engine</FONT></TD></TR><TR><TD><FONT POINT-SIZE="13" COLOR="#c7d2fe">Google ADK, Python</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#c7d2fe">Autonomous reasoning layer orchestrating<BR/>multi-step coordinator inquiries and<BR/>onboarding.</FONT></TD></TR></TABLE>>,
            likec4_id="broker.agent-engine",
            likec4_level=1,
            margin="0.223,0.223",
            width=4.445];
        "logistics-tools" [color="#4f46e5",
            fillcolor="#6366f1",
            fontcolor="#eef2ff",
            height=2.5,
            label=<<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">Uber Logistics Tool Suite</FONT></TD></TR><TR><TD><FONT POINT-SIZE="13" COLOR="#c7d2fe">Python 3.11</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#c7d2fe">Deterministic domain tools enforcing cold<BR/>chain physics, safety margins, and spatial<BR/>equity.</FONT></TD></TR></TABLE>>,
            likec4_id="broker.logistics-tools",
            likec4_level=1,
            margin="0.223,0.223",
            width=4.445];
        "mcp-toolbox" [color="#4f46e5",
            fillcolor="#6366f1",
            fontcolor="#eef2ff",
            height=2.5,
            label=<<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">MCP Database Toolbox</FONT></TD></TR><TR><TD><FONT POINT-SIZE="13" COLOR="#c7d2fe">Google Cloud MCP Toolbox for Databases</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#c7d2fe">Google-managed Model Context Protocol server<BR/>exposing BigQuery schema and SQL query<BR/>execution.</FONT></TD></TR></TABLE>>,
            likec4_id="broker.mcp-toolbox",
            likec4_level=1,
            margin="0.223,0.223",
            width=4.445];
        bigquery [height=2.5,
            label=<<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">BigQuery Warehouse &amp; Vector Store</FONT></TD></TR><TR><TD><FONT POINT-SIZE="13" COLOR="#bfdbfe">Google Cloud BigQuery (a4i_food dataset)</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#bfdbfe">Analytical warehouse storing recipient<BR/>profiles, census tracts, USDA shelf-life, and<BR/>vector embeddings.</FONT></TD></TR></TABLE>>,
            likec4_id="broker.bigquery",
            likec4_level=1,
            margin="0.223,0",
            penwidth=2,
            shape=cylinder,
            width=4.445];
    }
    donor [color="#475569",
        fillcolor="#64748b",
        fontcolor="#f8fafc",
        height=2.5,
        label=<<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">Food Donor</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#cbd5e1">Grocers, restaurants, and farmers offering<BR/>surplus food on tight expiration clocks.</FONT></TD></TR></TABLE>>,
        likec4_id=donor,
        likec4_level=0,
        margin="0.223,0.223",
        width=4.445];
    donor -> "web-ui" [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">Submits surplus offer with deadline<BR/>clock</FONT></TD></TR></TABLE>>,
        likec4_id="3tev0e",
        minlen=1,
        style=dashed];
    coordinator [color="#475569",
        fillcolor="#64748b",
        fontcolor="#f8fafc",
        height=2.5,
        label=<<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">Rescue Coordinator</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#cbd5e1">Dispatchers overseeing food matching,<BR/>resolving declines, and reviewing equity<BR/>briefs.</FONT></TD></TR></TABLE>>,
        likec4_id=coordinator,
        likec4_level=0,
        margin="0.223,0.223",
        width=4.445];
    coordinator -> "web-ui" [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">Reviews match brief, inspects decoys,<BR/>and triggers dispatches</FONT></TD></TR></TABLE>>,
        likec4_id=l0k398,
        minlen=1,
        style=dashed];
    pantry [color="#475569",
        fillcolor="#64748b",
        fontcolor="#f8fafc",
        height=2.5,
        label=<<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">Pantry Volunteer</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#cbd5e1">Pantry coordinators and shelter operators<BR/>receiving dispatches and onboarding capacity.</FONT></TD></TR></TABLE>>,
        likec4_id=pantry,
        likec4_level=0,
        margin="0.223,0.223",
        width=4.445];
    pantry -> "web-ui" [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">Onboards new pantry via conversational<BR/>interview</FONT></TD></TR></TABLE>>,
        likec4_id="141vjra",
        minlen=1,
        style=dashed];
    driver [color="#475569",
        fillcolor="#64748b",
        fontcolor="#f8fafc",
        height=2.5,
        label=<<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">Delivery Driver</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#cbd5e1">Volunteer drivers picking up surplus from<BR/>donor docks and delivering to pantries.</FONT></TD></TR></TABLE>>,
        likec4_id=driver,
        likec4_level=0,
        margin="0.223,0.223",
        width=4.445];
    driver -> "web-ui" [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">Receives turn-by-turn routing and pickup<BR/>alerts</FONT></TD></TR></TABLE>>,
        likec4_id="1geim6w",
        minlen=1,
        style=dashed];
    "web-ui" -> "api-backend" [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">Sends match, cascade, and intake<BR/>requests</FONT></TD></TR><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="12">[ HTTPS / JSON REST ]</FONT></TD></TR></TABLE>>,
        likec4_id="10yblfe",
        style=dashed,
        weight=2];
    "osm-tiles" [color="#475569",
        fillcolor="#64748b",
        fontcolor="#f8fafc",
        height=2.5,
        label=<<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">OpenStreetMap Tile Service</FONT></TD></TR><TR><TD><FONT POINT-SIZE="13" COLOR="#cbd5e1">Leaflet CDN</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#cbd5e1">Map tile provider rendering Chicago<BR/>geospatial layers, tracts, and pantry pins.</FONT></TD></TR></TABLE>>,
        likec4_id="osm-tiles",
        likec4_level=0,
        margin="0.223,0.223",
        width=4.445];
    "web-ui" -> "osm-tiles" [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">Fetches Chicago map tiles</FONT></TD></TR><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="12">[ HTTPS ]</FONT></TD></TR></TABLE>>,
        likec4_id="1ytdhz1",
        minlen=1,
        style=dashed];
    "api-backend" -> "agent-engine" [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">Dispatches coordinator queries and<BR/>briefs</FONT></TD></TR></TABLE>>,
        likec4_id="3rrfq9",
        style=dashed,
        weight=2];
    "api-backend" -> "logistics-tools" [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">Executes deterministic matching, clocks,<BR/>and traffic tools</FONT></TD></TR></TABLE>>,
        likec4_id=asho7i,
        style=dashed,
        weight=2];
    "api-backend" -> bigquery [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">Queries demographic baselines and audits</FONT></TD></TR><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="12">[ BigQuery Client SDK ]</FONT></TD></TR></TABLE>>,
        likec4_id="1fkfngd",
        style=dashed];
    "agent-engine" -> "logistics-tools" [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">Calls logistics and safety tools</FONT></TD></TR></TABLE>>,
        likec4_id=b5dgat,
        style=dashed,
        weight=2];
    "agent-engine" -> "mcp-toolbox" [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">Executes ad-hoc queries via MCP protocol</FONT></TD></TR><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="12">[ MCP JSON-RPC ]</FONT></TD></TR></TABLE>>,
        likec4_id="5mjlf2",
        style=dashed,
        weight=2];
    gemini [color="#475569",
        fillcolor="#64748b",
        fontcolor="#f8fafc",
        height=2.5,
        label=<<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">Google Gemini (Vertex AI)</FONT></TD></TR><TR><TD><FONT POINT-SIZE="13" COLOR="#cbd5e1">Gemini 2.5/3.8 Flash, Vertex AI</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#cbd5e1">Foundation LLM providing multi-step<BR/>reasoning, match-brief synthesis, and<BR/>conversational intake.</FONT></TD></TR></TABLE>>,
        likec4_id=gemini,
        likec4_level=0,
        margin="0.223,0.223",
        width=4.445];
    "agent-engine" -> gemini [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14"><B>[...]</B></FONT></TD></TR><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="12">[ gRPC / HTTPS ]</FONT></TD></TR></TABLE>>,
        likec4_id=cxs70,
        minlen=1,
        style=dashed];
    "agent-engine" -> bigquery [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">Inserts new recipient record with<BR/>embeddings</FONT></TD></TR></TABLE>>,
        likec4_id=cek4uu,
        style=dashed,
        weight=2];
    openfda [color="#475569",
        fillcolor="#64748b",
        fontcolor="#f8fafc",
        height=2.5,
        label=<<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">openFDA Food Safety API</FONT></TD></TR><TR><TD><FONT POINT-SIZE="13" COLOR="#cbd5e1">REST API, api.fda.gov</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#cbd5e1">Federal enforcement feed screening surplus<BR/>food for active recalls and undeclared<BR/>allergens.</FONT></TD></TR></TABLE>>,
        likec4_id=openfda,
        likec4_level=0,
        margin="0.223,0.223",
        width=4.445];
    "logistics-tools" -> openfda [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">Screens food description for active<BR/>recalls</FONT></TD></TR><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="12">[ HTTPS REST ]</FONT></TD></TR></TABLE>>,
        likec4_id="15ryidh",
        minlen=1,
        style=dashed];
    "chicago-traffic" [color="#475569",
        fillcolor="#64748b",
        fontcolor="#f8fafc",
        height=2.5,
        label=<<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">City of Chicago Traffic Tracker</FONT></TD></TR><TR><TD><FONT POINT-SIZE="13" COLOR="#cbd5e1">Civic Open Data API / OSRM</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#cbd5e1">Live congestion and arterial traffic speed<BR/>feed for transit ETA calculations.</FONT></TD></TR></TABLE>>,
        likec4_id="chicago-traffic",
        likec4_level=0,
        margin="0.223,0.223",
        width=4.445];
    "logistics-tools" -> "chicago-traffic" [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">Retrieves live street congestion speeds</FONT></TD></TR><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="12">[ HTTPS REST ]</FONT></TD></TR></TABLE>>,
        likec4_id="1wwbz4q",
        minlen=1,
        style=dashed];
    "logistics-tools" -> bigquery [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14"><B>[...]</B></FONT></TD></TR></TABLE>>,
        likec4_id="1jdb8xl",
        style=dashed,
        weight=2];
    "mcp-toolbox" -> bigquery [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">Introspects tables and runs ad-hoc SQL</FONT></TD></TR><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="12">[ BigQuery API ]</FONT></TD></TR></TABLE>>,
        likec4_id="1enep8y",
        style=dashed];
}
`;case`logistics`:return`digraph {
    graph [TBbalance=min,
        bgcolor=transparent,
        compound=true,
        fontname=Arial,
        fontsize=20,
        labeljust=l,
        labelloc=t,
        layout=dot,
        likec4_viewId=logistics,
        nodesep=1.528,
        outputorder=nodesfirst,
        pad=0.209,
        rankdir=LR,
        ranksep=1.667,
        splines=spline
    ];
    node [color="#2563eb",
        fillcolor="#3b82f6",
        fontcolor="#eff6ff",
        fontname=Arial,
        label="\\N",
        penwidth=0,
        shape=rect,
        style=filled
    ];
    edge [arrowsize=0.75,
        color="#8D8D8D",
        fontcolor="#C9C9C9",
        fontname=Arial,
        fontsize=14,
        penwidth=2,
        style=""
    ];
    subgraph "cluster_logistics-tools" {
        graph [color="#2a2490",
            fillcolor="#2225aa",
            label=<<FONT POINT-SIZE="11" COLOR="#c7d2feb3"><B>UBER LOGISTICS TOOL SUITE</B></FONT>>,
            likec4_depth=1,
            likec4_id="broker.logistics-tools",
            likec4_level=0,
            margin=40,
            style=filled
        ];
        "clock-calc" [color="#0369a1",
            fillcolor="#0284c7",
            fontcolor="#f0f9ff",
            height=2.5,
            label=<<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">Shelf-Life Clock Calculator</FONT></TD></TR><TR><TD><FONT POINT-SIZE="13" COLOR="#B6ECF7">Python</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#B6ECF7">Calculates effective pickup window from USDA<BR/>shelf-life references and donor deadlines.</FONT></TD></TR></TABLE>>,
            likec4_id="broker.logistics-tools.clock-calc",
            likec4_level=1,
            margin="0.5,0.223",
            width=4.584];
        matcher [color="#0369a1",
            fillcolor="#0284c7",
            fontcolor="#f0f9ff",
            height=2.5,
            label=<<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">Constraint Filter &amp; Tie-Breaker</FONT></TD></TR><TR><TD><FONT POINT-SIZE="13" COLOR="#B6ECF7">Python</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#B6ECF7">Hard-filters cold-chain decoys and<BR/>contradictions, then breaks ties on<BR/>vehicle-insecurity and poverty rates.</FONT></TD></TR></TABLE>>,
            likec4_id="broker.logistics-tools.matcher",
            likec4_level=1,
            margin="0.5,0.223",
            width=4.584];
        "cascading-dispatcher" [color="#0369a1",
            fillcolor="#0284c7",
            fontcolor="#f0f9ff",
            height=2.5,
            label=<<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">Cascading Dispatch Engine</FONT></TD></TR><TR><TD><FONT POINT-SIZE="13" COLOR="#B6ECF7">Python</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#B6ECF7">Generates tailored dispatch alerts and<BR/>instantly shifts to backup pantries if<BR/>primary declines.</FONT></TD></TR></TABLE>>,
            likec4_id="broker.logistics-tools.cascading-dispatcher",
            likec4_level=1,
            margin="0.5,0.223",
            width=4.584];
        "load-splitter" [color="#0369a1",
            fillcolor="#0284c7",
            fontcolor="#f0f9ff",
            height=2.5,
            label=<<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">Multi-Pantry Bulk Partitioning</FONT></TD></TR><TR><TD><FONT POINT-SIZE="13" COLOR="#B6ECF7">Python</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#B6ECF7">Partitions massive agricultural donations<BR/>across multiple pantries when exceeding<BR/>single capacity.</FONT></TD></TR></TABLE>>,
            likec4_id="broker.logistics-tools.load-splitter",
            likec4_level=1,
            margin="0.5,0.223",
            width=4.584];
        "recall-checker" [color="#0369a1",
            fillcolor="#0284c7",
            fontcolor="#f0f9ff",
            height=2.5,
            label=<<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">Food Safety Recall Guardrail</FONT></TD></TR><TR><TD><FONT POINT-SIZE="13" COLOR="#B6ECF7">Python</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#B6ECF7">Queries openFDA to halt or flag postings<BR/>subject to active food recall notices.</FONT></TD></TR></TABLE>>,
            likec4_id="broker.logistics-tools.recall-checker",
            likec4_level=1,
            margin="0.5,0.223",
            width=4.584];
        "traffic-router" [color="#0369a1",
            fillcolor="#0284c7",
            fontcolor="#f0f9ff",
            height=2.5,
            label=<<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">Chicago Traffic &amp; Route Router</FONT></TD></TR><TR><TD><FONT POINT-SIZE="13" COLOR="#B6ECF7">Python</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#B6ECF7">Computes real-time driving duration,<BR/>congestion delay, and safety margins.</FONT></TD></TR></TABLE>>,
            likec4_id="broker.logistics-tools.traffic-router",
            likec4_level=1,
            margin="0.5,0.223",
            width=4.584];
        "equity-auditor" [color="#0369a1",
            fillcolor="#0284c7",
            fontcolor="#f0f9ff",
            height=2.5,
            label=<<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">Spatial Equity Auditor</FONT></TD></TR><TR><TD><FONT POINT-SIZE="13" COLOR="#B6ECF7">Python</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#B6ECF7">Measures demographic lift against metro<BR/>baselines and uncovers cold-chain rescue<BR/>deserts.</FONT></TD></TR></TABLE>>,
            likec4_id="broker.logistics-tools.equity-auditor",
            likec4_level=1,
            margin="0.5,0.223",
            width=4.584];
    }
    bigquery [height=2.5,
        label=<<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">BigQuery Warehouse &amp; Vector Store</FONT></TD></TR><TR><TD><FONT POINT-SIZE="13" COLOR="#bfdbfe">Google Cloud BigQuery (a4i_food dataset)</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#bfdbfe">Analytical warehouse storing recipient<BR/>profiles, census tracts, USDA shelf-life, and<BR/>vector embeddings.</FONT></TD></TR></TABLE>>,
        likec4_id="broker.bigquery",
        likec4_level=0,
        margin="0.223,0",
        penwidth=2,
        shape=cylinder,
        width=4.445];
    "clock-calc" -> bigquery [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">Reads shelf-life reference hours</FONT></TD></TR></TABLE>>,
        likec4_id="1wbdyfz",
        minlen=1,
        style=dashed];
    matcher -> bigquery [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14"><B>[...]</B></FONT></TD></TR></TABLE>>,
        likec4_id="149f237",
        minlen=1,
        style=dashed];
    "cascading-dispatcher" -> "load-splitter" [style=invis];
    openfda [color="#475569",
        fillcolor="#64748b",
        fontcolor="#f8fafc",
        height=2.5,
        label=<<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">openFDA Food Safety API</FONT></TD></TR><TR><TD><FONT POINT-SIZE="13" COLOR="#cbd5e1">REST API, api.fda.gov</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#cbd5e1">Federal enforcement feed screening surplus<BR/>food for active recalls and undeclared<BR/>allergens.</FONT></TD></TR></TABLE>>,
        likec4_id=openfda,
        likec4_level=0,
        margin="0.223,0.223",
        width=4.445];
    "recall-checker" -> openfda [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">Screens food description for active<BR/>recalls</FONT></TD></TR><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="12">[ HTTPS REST ]</FONT></TD></TR></TABLE>>,
        likec4_id="4s1l7m",
        style=dashed,
        weight=3];
    "chicago-traffic" [color="#475569",
        fillcolor="#64748b",
        fontcolor="#f8fafc",
        height=2.5,
        label=<<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">City of Chicago Traffic Tracker</FONT></TD></TR><TR><TD><FONT POINT-SIZE="13" COLOR="#cbd5e1">Civic Open Data API / OSRM</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#cbd5e1">Live congestion and arterial traffic speed<BR/>feed for transit ETA calculations.</FONT></TD></TR></TABLE>>,
        likec4_id="chicago-traffic",
        likec4_level=0,
        margin="0.223,0.223",
        width=4.445];
    "traffic-router" -> "chicago-traffic" [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">Retrieves live street congestion speeds</FONT></TD></TR><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="12">[ HTTPS REST ]</FONT></TD></TR></TABLE>>,
        likec4_id="1mu4vsv",
        style=dashed,
        weight=3];
    "equity-auditor" -> bigquery [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">Audits spatial distribution and gaps</FONT></TD></TR></TABLE>>,
        likec4_id="8avwnj",
        minlen=1,
        style=dashed];
}
`;case`data-layer`:return`digraph {
    graph [TBbalance=min,
        bgcolor=transparent,
        compound=true,
        fontname=Arial,
        fontsize=20,
        labeljust=l,
        labelloc=t,
        layout=dot,
        likec4_viewId="data-layer",
        nodesep=1.528,
        outputorder=nodesfirst,
        pad=0.209,
        rankdir=TB,
        ranksep=1.667,
        splines=spline
    ];
    node [color="#2563eb",
        fillcolor="#3b82f6",
        fontcolor="#eff6ff",
        fontname=Arial,
        label="\\N",
        penwidth=0,
        shape=rect,
        style=filled
    ];
    edge [arrowsize=0.75,
        color="#8D8D8D",
        fontcolor="#C9C9C9",
        fontname=Arial,
        fontsize=14,
        penwidth=2,
        style=""
    ];
    subgraph cluster_bigquery {
        graph [color="#1b3d88",
            fillcolor="#194b9e",
            label=<<FONT POINT-SIZE="11" COLOR="#bfdbfeb3"><B>BIGQUERY WAREHOUSE &amp; VECTOR STORE</B></FONT>>,
            likec4_depth=1,
            likec4_id="broker.bigquery",
            likec4_level=0,
            margin=40,
            style=filled
        ];
        "recipients-data" [color="#0369a1",
            fillcolor="#0284c7",
            fontcolor="#f0f9ff",
            height=2.5,
            label=<<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">Recipients &amp; Capacities Table</FONT></TD></TR><TR><TD><FONT POINT-SIZE="13" COLOR="#B6ECF7">BigQuery Table</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#B6ECF7">Stores organizations, walk-in cold storage<BR/>capacity, pickup windows, and embedding<BR/>vectors.</FONT></TD></TR></TABLE>>,
            likec4_id="broker.bigquery.recipients-data",
            likec4_level=1,
            margin="0.5,0.223",
            width=4.584];
        "shelf-life-data" [color="#0369a1",
            fillcolor="#0284c7",
            fontcolor="#f0f9ff",
            height=2.5,
            label=<<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">USDA Shelf-Life Catalog</FONT></TD></TR><TR><TD><FONT POINT-SIZE="13" COLOR="#B6ECF7">BigQuery Table</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#B6ECF7">Standard perishable and pantry food storage<BR/>guidelines and maximum viable hours.</FONT></TD></TR></TABLE>>,
            likec4_id="broker.bigquery.shelf-life-data",
            likec4_level=1,
            margin="0.5,0.223",
            width=4.584];
        "tract-demographics" [color="#0369a1",
            fillcolor="#0284c7",
            fontcolor="#f0f9ff",
            height=2.5,
            label=<<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">Census Tract Demographics</FONT></TD></TR><TR><TD><FONT POINT-SIZE="13" COLOR="#B6ECF7">BigQuery Table &amp; Spatial Polygons</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#B6ECF7">Cook County tract demographic metrics<BR/>(poverty rate, zero-vehicle percentage,<BR/>internal centroids).</FONT></TD></TR></TABLE>>,
            likec4_id="broker.bigquery.tract-demographics",
            likec4_level=1,
            margin="0.5,0.223",
            width=4.584];
        "vector-index" [color="#0369a1",
            fillcolor="#0284c7",
            fontcolor="#f0f9ff",
            height=2.5,
            label=<<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">BigQuery Vector Search Engine</FONT></TD></TR><TR><TD><FONT POINT-SIZE="13" COLOR="#B6ECF7">VECTOR_SEARCH, gemini-embedding-2</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#B6ECF7">Cosine distance semantic search identifying<BR/>matching pantries from donor natural language<BR/>postings.</FONT></TD></TR></TABLE>>,
            likec4_id="broker.bigquery.vector-index",
            likec4_level=1,
            margin="0.5,0.223",
            width=4.584];
        "rescue-deserts" [color="#0369a1",
            fillcolor="#0284c7",
            fontcolor="#f0f9ff",
            height=2.5,
            label=<<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">Rescue Deserts Spatial View</FONT></TD></TR><TR><TD><FONT POINT-SIZE="13" COLOR="#B6ECF7">BigQuery View</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#B6ECF7">Identifies tracts with &gt;30% poverty and &gt;40%<BR/>no-vehicle rates having 0 cold-storage<BR/>pantries within 5km.</FONT></TD></TR></TABLE>>,
            likec4_id="broker.bigquery.rescue-deserts",
            likec4_level=1,
            margin="0.5,0.223",
            width=4.584];
    }
    "agent-engine" [color="#4f46e5",
        fillcolor="#6366f1",
        fontcolor="#eef2ff",
        height=2.5,
        label=<<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">ADK Agent Reasoning Engine</FONT></TD></TR><TR><TD><FONT POINT-SIZE="13" COLOR="#c7d2fe">Google ADK, Python</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#c7d2fe">Autonomous reasoning layer orchestrating<BR/>multi-step coordinator inquiries and<BR/>onboarding.</FONT></TD></TR></TABLE>>,
        likec4_id="broker.agent-engine",
        likec4_level=0,
        margin="0.223,0.223",
        width=4.445];
    "agent-engine" -> "recipients-data" [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">Inserts new recipient record with<BR/>embeddings</FONT></TD></TR></TABLE>>,
        likec4_id="5rvaz1",
        minlen=1,
        style=dashed];
    "logistics-tools" [color="#4f46e5",
        fillcolor="#6366f1",
        fontcolor="#eef2ff",
        height=2.5,
        label=<<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">Uber Logistics Tool Suite</FONT></TD></TR><TR><TD><FONT POINT-SIZE="13" COLOR="#c7d2fe">Python 3.11</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#c7d2fe">Deterministic domain tools enforcing cold<BR/>chain physics, safety margins, and spatial<BR/>equity.</FONT></TD></TR></TABLE>>,
        likec4_id="broker.logistics-tools",
        likec4_level=0,
        margin="0.223,0.223",
        width=4.445];
    "logistics-tools" -> "recipients-data" [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">Filters by cold storage &amp; capacity</FONT></TD></TR></TABLE>>,
        likec4_id="10o0jky",
        style=dashed];
    "logistics-tools" -> "shelf-life-data" [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">Reads shelf-life reference hours</FONT></TD></TR></TABLE>>,
        likec4_id="5bfvdh",
        minlen=1,
        style=dashed];
    "logistics-tools" -> "tract-demographics" [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">Enriches with poverty &amp; vehicle stats</FONT></TD></TR></TABLE>>,
        likec4_id=e44d8,
        minlen=1,
        style=dashed];
    "logistics-tools" -> "vector-index" [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">Runs VECTOR_SEARCH on donor description</FONT></TD></TR></TABLE>>,
        likec4_id="18i9tml",
        minlen=1,
        style=dashed];
    "logistics-tools" -> "rescue-deserts" [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">Audits spatial distribution and gaps</FONT></TD></TR></TABLE>>,
        likec4_id=phsci7,
        minlen=1,
        style=dashed];
}
`;case`spinach-rescue-flow`:return`digraph {
  likec4_viewId = "spinach-rescue-flow";
  bgcolor = "transparent";
  layout = "dot";
  compound = true;
  rankdir = "LR";
  splines = "spline";
  outputorder = "nodesfirst";
  nodesep = 1.528;
  ranksep = 1.667;
  pad = 0.209;
  fontname = "Arial";
  ordering = "in";
  graph [
    fontsize = 20;
    labeljust = "l";
    labelloc = "t";
  ];
  edge [
    arrowsize = 0.75;
    fontname = "Arial";
    fontsize = 14;
    penwidth = 2;
    color = "#8D8D8D";
    fontcolor = "#C9C9C9";
    style = "dashed";
  ];
  node [
    fontname = "Arial";
    shape = "rect";
    fillcolor = "#3b82f6";
    fontcolor = "#eff6ff";
    color = "#2563eb";
    style = "filled";
    penwidth = 0;
  ];
  "donor" [
    likec4_id = "donor";
    likec4_level = 0;
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">Food Donor</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#cbd5e1">Grocers, restaurants, and farmers offering<BR/>surplus food on tight expiration clocks.</FONT></TD></TR></TABLE>>;
    margin = "0.223,0.223";
    width = 4.445;
    height = 2.5;
    fillcolor = "#64748b";
    fontcolor = "#f8fafc";
    color = "#475569";
  ];
  "coordinator" [
    likec4_id = "coordinator";
    likec4_level = 0;
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">Rescue Coordinator</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#cbd5e1">Dispatchers overseeing food matching,<BR/>resolving declines, and reviewing equity<BR/>briefs.</FONT></TD></TR></TABLE>>;
    margin = "0.223,0.223";
    width = 4.445;
    height = 2.5;
    fillcolor = "#64748b";
    fontcolor = "#f8fafc";
    color = "#475569";
  ];
  "web-ui" [
    likec4_id = "broker.web-ui";
    likec4_level = 0;
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">RescueDispatch Web Console</FONT></TD></TR><TR><TD><FONT POINT-SIZE="13" COLOR="#c7d2fe">HTML5, Leaflet.js, CSS3</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#c7d2fe">Interactive console featuring 1-click<BR/>scenarios, live Chicago map, 7-part match<BR/>briefs, and smartphone SMS simulator.</FONT></TD></TR></TABLE>>;
    margin = "0.223,0.223";
    width = 4.445;
    height = 2.5;
    fillcolor = "#6366f1";
    fontcolor = "#eef2ff";
    color = "#4f46e5";
  ];
  "api-backend" [
    likec4_id = "broker.api-backend";
    likec4_level = 0;
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">FastAPI Dispatch Service</FONT></TD></TR><TR><TD><FONT POINT-SIZE="13" COLOR="#c7d2fe">Python 3.11, FastAPI, Uvicorn</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#c7d2fe">REST API handling match requests, fallback<BR/>cascading, live equity audits, and pantry<BR/>onboarding.</FONT></TD></TR></TABLE>>;
    margin = "0.223,0.223";
    width = 4.445;
    height = 2.5;
    fillcolor = "#6366f1";
    fontcolor = "#eef2ff";
    color = "#4f46e5";
  ];
  "clock-calc" [
    likec4_id = "broker.logistics-tools.clock-calc";
    likec4_level = 0;
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">Shelf-Life Clock Calculator</FONT></TD></TR><TR><TD><FONT POINT-SIZE="13" COLOR="#B6ECF7">Python</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#B6ECF7">Calculates effective pickup window from USDA<BR/>shelf-life references and donor deadlines.</FONT></TD></TR></TABLE>>;
    margin = "0.5,0.223";
    width = 4.584;
    height = 2.5;
    fillcolor = "#0284c7";
    fontcolor = "#f0f9ff";
    color = "#0369a1";
  ];
  "shelf-life-data" [
    likec4_id = "broker.bigquery.shelf-life-data";
    likec4_level = 0;
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">USDA Shelf-Life Catalog</FONT></TD></TR><TR><TD><FONT POINT-SIZE="13" COLOR="#B6ECF7">BigQuery Table</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#B6ECF7">Standard perishable and pantry food storage<BR/>guidelines and maximum viable hours.</FONT></TD></TR></TABLE>>;
    margin = "0.5,0.223";
    width = 4.584;
    height = 2.5;
    fillcolor = "#0284c7";
    fontcolor = "#f0f9ff";
    color = "#0369a1";
  ];
  "recall-checker" [
    likec4_id = "broker.logistics-tools.recall-checker";
    likec4_level = 0;
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">Food Safety Recall Guardrail</FONT></TD></TR><TR><TD><FONT POINT-SIZE="13" COLOR="#B6ECF7">Python</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#B6ECF7">Queries openFDA to halt or flag postings<BR/>subject to active food recall notices.</FONT></TD></TR></TABLE>>;
    margin = "0.5,0.223";
    width = 4.584;
    height = 2.5;
    fillcolor = "#0284c7";
    fontcolor = "#f0f9ff";
    color = "#0369a1";
  ];
  "openfda" [
    likec4_id = "openfda";
    likec4_level = 0;
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">openFDA Food Safety API</FONT></TD></TR><TR><TD><FONT POINT-SIZE="13" COLOR="#cbd5e1">REST API, api.fda.gov</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#cbd5e1">Federal enforcement feed screening surplus<BR/>food for active recalls and undeclared<BR/>allergens.</FONT></TD></TR></TABLE>>;
    margin = "0.223,0.223";
    width = 4.445;
    height = 2.5;
    fillcolor = "#64748b";
    fontcolor = "#f8fafc";
    color = "#475569";
  ];
  "matcher" [
    likec4_id = "broker.logistics-tools.matcher";
    likec4_level = 0;
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">Constraint Filter &amp; Tie-Breaker</FONT></TD></TR><TR><TD><FONT POINT-SIZE="13" COLOR="#B6ECF7">Python</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#B6ECF7">Hard-filters cold-chain decoys and<BR/>contradictions, then breaks ties on<BR/>vehicle-insecurity and poverty rates.</FONT></TD></TR></TABLE>>;
    margin = "0.5,0.223";
    width = 4.584;
    height = 2.5;
    fillcolor = "#0284c7";
    fontcolor = "#f0f9ff";
    color = "#0369a1";
  ];
  "vector-index" [
    likec4_id = "broker.bigquery.vector-index";
    likec4_level = 0;
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">BigQuery Vector Search Engine</FONT></TD></TR><TR><TD><FONT POINT-SIZE="13" COLOR="#B6ECF7">VECTOR_SEARCH, gemini-embedding-2</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#B6ECF7">Cosine distance semantic search identifying<BR/>matching pantries from donor natural language<BR/>postings.</FONT></TD></TR></TABLE>>;
    margin = "0.5,0.223";
    width = 4.584;
    height = 2.5;
    fillcolor = "#0284c7";
    fontcolor = "#f0f9ff";
    color = "#0369a1";
  ];
  "recipients-data" [
    likec4_id = "broker.bigquery.recipients-data";
    likec4_level = 0;
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">Recipients &amp; Capacities Table</FONT></TD></TR><TR><TD><FONT POINT-SIZE="13" COLOR="#B6ECF7">BigQuery Table</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#B6ECF7">Stores organizations, walk-in cold storage<BR/>capacity, pickup windows, and embedding<BR/>vectors.</FONT></TD></TR></TABLE>>;
    margin = "0.5,0.223";
    width = 4.584;
    height = 2.5;
    fillcolor = "#0284c7";
    fontcolor = "#f0f9ff";
    color = "#0369a1";
  ];
  "tract-demographics" [
    likec4_id = "broker.bigquery.tract-demographics";
    likec4_level = 0;
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">Census Tract Demographics</FONT></TD></TR><TR><TD><FONT POINT-SIZE="13" COLOR="#B6ECF7">BigQuery Table &amp; Spatial Polygons</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#B6ECF7">Cook County tract demographic metrics<BR/>(poverty rate, zero-vehicle percentage,<BR/>internal centroids).</FONT></TD></TR></TABLE>>;
    margin = "0.5,0.223";
    width = 4.584;
    height = 2.5;
    fillcolor = "#0284c7";
    fontcolor = "#f0f9ff";
    color = "#0369a1";
  ];
  "traffic-router" [
    likec4_id = "broker.logistics-tools.traffic-router";
    likec4_level = 0;
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">Chicago Traffic &amp; Route Router</FONT></TD></TR><TR><TD><FONT POINT-SIZE="13" COLOR="#B6ECF7">Python</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#B6ECF7">Computes real-time driving duration,<BR/>congestion delay, and safety margins.</FONT></TD></TR></TABLE>>;
    margin = "0.5,0.223";
    width = 4.584;
    height = 2.5;
    fillcolor = "#0284c7";
    fontcolor = "#f0f9ff";
    color = "#0369a1";
  ];
  "chicago-traffic" [
    likec4_id = "chicago-traffic";
    likec4_level = 0;
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">City of Chicago Traffic Tracker</FONT></TD></TR><TR><TD><FONT POINT-SIZE="13" COLOR="#cbd5e1">Civic Open Data API / OSRM</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#cbd5e1">Live congestion and arterial traffic speed<BR/>feed for transit ETA calculations.</FONT></TD></TR></TABLE>>;
    margin = "0.223,0.223";
    width = 4.445;
    height = 2.5;
    fillcolor = "#64748b";
    fontcolor = "#f8fafc";
    color = "#475569";
  ];
  "broker-agent" [
    likec4_id = "broker.agent-engine.broker-agent";
    likec4_level = 0;
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">Surplus Broker Root Agent</FONT></TD></TR><TR><TD><FONT POINT-SIZE="13" COLOR="#B6ECF7">Google ADK, Gemini 2.5 Flash</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#B6ECF7">Evaluates offers, invokes logistics tools,<BR/>weighs trade-offs, and synthesizes 7-part<BR/>match briefs.</FONT></TD></TR></TABLE>>;
    margin = "0.5,0.223";
    width = 4.584;
    height = 2.5;
    fillcolor = "#0284c7";
    fontcolor = "#f0f9ff";
    color = "#0369a1";
  ];
  "gemini" [
    likec4_id = "gemini";
    likec4_level = 0;
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">Google Gemini (Vertex AI)</FONT></TD></TR><TR><TD><FONT POINT-SIZE="13" COLOR="#cbd5e1">Gemini 2.5/3.8 Flash, Vertex AI</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#cbd5e1">Foundation LLM providing multi-step<BR/>reasoning, match-brief synthesis, and<BR/>conversational intake.</FONT></TD></TR></TABLE>>;
    margin = "0.223,0.223";
    width = 4.445;
    height = 2.5;
    fillcolor = "#64748b";
    fontcolor = "#f8fafc";
    color = "#475569";
  ];
  "cascading-dispatcher" [
    likec4_id = "broker.logistics-tools.cascading-dispatcher";
    likec4_level = 0;
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">Cascading Dispatch Engine</FONT></TD></TR><TR><TD><FONT POINT-SIZE="13" COLOR="#B6ECF7">Python</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#B6ECF7">Generates tailored dispatch alerts and<BR/>instantly shifts to backup pantries if<BR/>primary declines.</FONT></TD></TR></TABLE>>;
    margin = "0.5,0.223";
    width = 4.584;
    height = 2.5;
    fillcolor = "#0284c7";
    fontcolor = "#f0f9ff";
    color = "#0369a1";
  ];
  "donor" -> "web-ui" [
    likec4_id = "step-01";
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="3"><TR><TD><TABLE BORDER="0" CELLPADDING="6" BGCOLOR="#18191BA0"><TR><TD WIDTH="20" HEIGHT="20"><FONT POINT-SIZE="14"><B>0</B></FONT></TD></TR></TABLE></TD><TD BGCOLOR="#18191BA0" CELLPADDING="3"><FONT POINT-SIZE="14">1. Submits 10 crates spinach with 6-hour<BR/>deadline</FONT></TD></TR></TABLE>>;
    arrowhead = "normal";
  ];
  "web-ui" -> "api-backend" [
    likec4_id = "step-02";
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="3"><TR><TD><TABLE BORDER="0" CELLPADDING="6" BGCOLOR="#18191BA0"><TR><TD WIDTH="20" HEIGHT="20"><FONT POINT-SIZE="14"><B>1</B></FONT></TD></TR></TABLE></TD><TD BGCOLOR="#18191BA0" CELLPADDING="3"><FONT POINT-SIZE="14">2. POST /api/match<BR/>HTTPS / JSON REST</FONT></TD></TR></TABLE>>;
    arrowhead = "normal";
  ];
  "api-backend" -> "clock-calc" [
    likec4_id = "step-03";
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="3"><TR><TD><TABLE BORDER="0" CELLPADDING="6" BGCOLOR="#18191BA0"><TR><TD WIDTH="20" HEIGHT="20"><FONT POINT-SIZE="14"><B>2</B></FONT></TD></TR></TABLE></TD><TD BGCOLOR="#18191BA0" CELLPADDING="3"><FONT POINT-SIZE="14">3. Calculate effective shelf-life window</FONT></TD></TR></TABLE>>;
    arrowhead = "normal";
  ];
  "clock-calc" -> "shelf-life-data" [
    likec4_id = "step-04";
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="3"><TR><TD><TABLE BORDER="0" CELLPADDING="6" BGCOLOR="#18191BA0"><TR><TD WIDTH="20" HEIGHT="20"><FONT POINT-SIZE="14"><B>3</B></FONT></TD></TR></TABLE></TD><TD BGCOLOR="#18191BA0" CELLPADDING="3"><FONT POINT-SIZE="14">4. Lookup spinach USDA shelf life</FONT></TD></TR></TABLE>>;
    arrowhead = "normal";
  ];
  "api-backend" -> "recall-checker" [
    likec4_id = "step-05";
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="3"><TR><TD><TABLE BORDER="0" CELLPADDING="6" BGCOLOR="#18191BA0"><TR><TD WIDTH="20" HEIGHT="20"><FONT POINT-SIZE="14"><B>4</B></FONT></TD></TR></TABLE></TD><TD BGCOLOR="#18191BA0" CELLPADDING="3"><FONT POINT-SIZE="14">5. Screen for active FDA recalls</FONT></TD></TR></TABLE>>;
    arrowhead = "normal";
  ];
  "recall-checker" -> "openfda" [
    likec4_id = "step-06";
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="3"><TR><TD><TABLE BORDER="0" CELLPADDING="6" BGCOLOR="#18191BA0"><TR><TD WIDTH="20" HEIGHT="20"><FONT POINT-SIZE="14"><B>5</B></FONT></TD></TR></TABLE></TD><TD BGCOLOR="#18191BA0" CELLPADDING="3"><FONT POINT-SIZE="14">6. Query food recall API<BR/>HTTPS REST</FONT></TD></TR></TABLE>>;
    arrowhead = "normal";
  ];
  "api-backend" -> "matcher" [
    likec4_id = "step-07";
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="3"><TR><TD><TABLE BORDER="0" CELLPADDING="6" BGCOLOR="#18191BA0"><TR><TD WIDTH="20" HEIGHT="20"><FONT POINT-SIZE="14"><B>6</B></FONT></TD></TR></TABLE></TD><TD BGCOLOR="#18191BA0" CELLPADDING="3"><FONT POINT-SIZE="14">7. Find and rank qualified pantries</FONT></TD></TR></TABLE>>;
    arrowhead = "normal";
  ];
  "matcher" -> "vector-index" [
    likec4_id = "step-08";
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="3"><TR><TD><TABLE BORDER="0" CELLPADDING="6" BGCOLOR="#18191BA0"><TR><TD WIDTH="20" HEIGHT="20"><FONT POINT-SIZE="14"><B>7</B></FONT></TD></TR></TABLE></TD><TD BGCOLOR="#18191BA0" CELLPADDING="3"><FONT POINT-SIZE="14">8. Run VECTOR_SEARCH on profile text</FONT></TD></TR></TABLE>>;
    arrowhead = "normal";
  ];
  "matcher" -> "recipients-data" [
    likec4_id = "step-09";
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="3"><TR><TD><TABLE BORDER="0" CELLPADDING="6" BGCOLOR="#18191BA0"><TR><TD WIDTH="20" HEIGHT="20"><FONT POINT-SIZE="14"><B>8</B></FONT></TD></TR></TABLE></TD><TD BGCOLOR="#18191BA0" CELLPADDING="3"><FONT POINT-SIZE="14">9. Check cold storage &amp; capacity</FONT></TD></TR></TABLE>>;
    arrowhead = "normal";
  ];
  "matcher" -> "matcher" [
    likec4_id = "step-10";
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="3"><TR><TD><TABLE BORDER="0" CELLPADDING="6" BGCOLOR="#18191BA0"><TR><TD WIDTH="20" HEIGHT="20"><FONT POINT-SIZE="14"><B>9</B></FONT></TD></TR></TABLE></TD><TD BGCOLOR="#18191BA0" CELLPADDING="3"><FONT POINT-SIZE="14">10. Hard-filter Greenline decoy (No cold<BR/>storage)</FONT></TD></TR></TABLE>>;
    arrowhead = "normal";
  ];
  "matcher" -> "tract-demographics" [
    likec4_id = "step-11";
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="3"><TR><TD><TABLE BORDER="0" CELLPADDING="6" BGCOLOR="#18191BA0"><TR><TD WIDTH="20" HEIGHT="20"><FONT POINT-SIZE="14"><B>10</B></FONT></TD></TR></TABLE></TD><TD BGCOLOR="#18191BA0" CELLPADDING="3"><FONT POINT-SIZE="14">11. Enrich with tract vehicle-insecurity<BR/>%</FONT></TD></TR></TABLE>>;
    arrowhead = "normal";
  ];
  "api-backend" -> "traffic-router" [
    likec4_id = "step-12";
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="3"><TR><TD><TABLE BORDER="0" CELLPADDING="6" BGCOLOR="#18191BA0"><TR><TD WIDTH="20" HEIGHT="20"><FONT POINT-SIZE="14"><B>11</B></FONT></TD></TR></TABLE></TD><TD BGCOLOR="#18191BA0" CELLPADDING="3"><FONT POINT-SIZE="14">12. Compute route driving time and<BR/>congestion delay</FONT></TD></TR></TABLE>>;
    arrowhead = "normal";
  ];
  "traffic-router" -> "chicago-traffic" [
    likec4_id = "step-13";
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="3"><TR><TD><TABLE BORDER="0" CELLPADDING="6" BGCOLOR="#18191BA0"><TR><TD WIDTH="20" HEIGHT="20"><FONT POINT-SIZE="14"><B>12</B></FONT></TD></TR></TABLE></TD><TD BGCOLOR="#18191BA0" CELLPADDING="3"><FONT POINT-SIZE="14">13. Query Chicago live traffic speeds<BR/>HTTPS REST</FONT></TD></TR></TABLE>>;
    arrowhead = "normal";
  ];
  "api-backend" -> "broker-agent" [
    likec4_id = "step-14";
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="3"><TR><TD><TABLE BORDER="0" CELLPADDING="6" BGCOLOR="#18191BA0"><TR><TD WIDTH="20" HEIGHT="20"><FONT POINT-SIZE="14"><B>13</B></FONT></TD></TR></TABLE></TD><TD BGCOLOR="#18191BA0" CELLPADDING="3"><FONT POINT-SIZE="14">14. Synthesize 7-Part Match Brief</FONT></TD></TR></TABLE>>;
    arrowhead = "normal";
  ];
  "broker-agent" -> "gemini" [
    likec4_id = "step-15";
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="3"><TR><TD><TABLE BORDER="0" CELLPADDING="6" BGCOLOR="#18191BA0"><TR><TD WIDTH="20" HEIGHT="20"><FONT POINT-SIZE="14"><B>14</B></FONT></TD></TR></TABLE></TD><TD BGCOLOR="#18191BA0" CELLPADDING="3"><FONT POINT-SIZE="14">15. Generate reasoned explanation and<BR/>driver SMS<BR/>gRPC / HTTPS</FONT></TD></TR></TABLE>>;
    arrowhead = "normal";
  ];
  "web-ui" -> "api-backend" [
    likec4_id = "step-16";
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="3"><TR><TD><TABLE BORDER="0" CELLPADDING="6" BGCOLOR="#18191BA0"><TR><TD WIDTH="20" HEIGHT="20"><FONT POINT-SIZE="14"><B>15</B></FONT></TD></TR></TABLE></TD><TD BGCOLOR="#18191BA0" CELLPADDING="3"><FONT POINT-SIZE="14">16. Render Match Card, Leaflet Map pins,<BR/>and Decoy explanation</FONT></TD></TR></TABLE>>;
    arrowtail = "normal";
    dir = "back";
  ];
  "coordinator" -> "web-ui" [
    likec4_id = "step-17";
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="3"><TR><TD><TABLE BORDER="0" CELLPADDING="6" BGCOLOR="#18191BA0"><TR><TD WIDTH="20" HEIGHT="20"><FONT POINT-SIZE="14"><B>16</B></FONT></TD></TR></TABLE></TD><TD BGCOLOR="#18191BA0" CELLPADDING="3"><FONT POINT-SIZE="14">17. Primary pantry declines offer:<BR/>clicks [They said no]</FONT></TD></TR></TABLE>>;
    arrowhead = "normal";
  ];
  "web-ui" -> "api-backend" [
    likec4_id = "step-18";
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="3"><TR><TD><TABLE BORDER="0" CELLPADDING="6" BGCOLOR="#18191BA0"><TR><TD WIDTH="20" HEIGHT="20"><FONT POINT-SIZE="14"><B>17</B></FONT></TD></TR></TABLE></TD><TD BGCOLOR="#18191BA0" CELLPADDING="3"><FONT POINT-SIZE="14">18. POST /api/dispatch-fallback<BR/>HTTPS / JSON REST</FONT></TD></TR></TABLE>>;
    arrowhead = "normal";
  ];
  "api-backend" -> "cascading-dispatcher" [
    likec4_id = "step-19";
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="3"><TR><TD><TABLE BORDER="0" CELLPADDING="6" BGCOLOR="#18191BA0"><TR><TD WIDTH="20" HEIGHT="20"><FONT POINT-SIZE="14"><B>18</B></FONT></TD></TR></TABLE></TD><TD BGCOLOR="#18191BA0" CELLPADDING="3"><FONT POINT-SIZE="14">19. Promote Backup #2 to primary</FONT></TD></TR></TABLE>>;
    arrowhead = "normal";
  ];
  "web-ui" -> "api-backend" [
    likec4_id = "step-20";
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="3"><TR><TD><TABLE BORDER="0" CELLPADDING="6" BGCOLOR="#18191BA0"><TR><TD WIDTH="20" HEIGHT="20"><FONT POINT-SIZE="14"><B>19</B></FONT></TD></TR></TABLE></TD><TD BGCOLOR="#18191BA0" CELLPADDING="3"><FONT POINT-SIZE="14">20. Instant re-dispatch with updated SMS<BR/>alert</FONT></TD></TR></TABLE>>;
    arrowtail = "normal";
    dir = "back";
  ];
}`;case`pantry-onboarding-flow`:return`digraph {
  likec4_viewId = "pantry-onboarding-flow";
  bgcolor = "transparent";
  layout = "dot";
  compound = true;
  rankdir = "LR";
  splines = "spline";
  outputorder = "nodesfirst";
  nodesep = 1.528;
  ranksep = 1.667;
  pad = 0.209;
  fontname = "Arial";
  ordering = "in";
  graph [
    fontsize = 20;
    labeljust = "l";
    labelloc = "t";
  ];
  edge [
    arrowsize = 0.75;
    fontname = "Arial";
    fontsize = 14;
    penwidth = 2;
    color = "#8D8D8D";
    fontcolor = "#C9C9C9";
    style = "dashed";
  ];
  node [
    fontname = "Arial";
    shape = "rect";
    fillcolor = "#3b82f6";
    fontcolor = "#eff6ff";
    color = "#2563eb";
    style = "filled";
    penwidth = 0;
  ];
  "pantry" [
    likec4_id = "pantry";
    likec4_level = 0;
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">Pantry Volunteer</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#cbd5e1">Pantry coordinators and shelter operators<BR/>receiving dispatches and onboarding capacity.</FONT></TD></TR></TABLE>>;
    margin = "0.223,0.223";
    width = 4.445;
    height = 2.5;
    fillcolor = "#64748b";
    fontcolor = "#f8fafc";
    color = "#475569";
  ];
  "web-ui" [
    likec4_id = "broker.web-ui";
    likec4_level = 0;
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">RescueDispatch Web Console</FONT></TD></TR><TR><TD><FONT POINT-SIZE="13" COLOR="#c7d2fe">HTML5, Leaflet.js, CSS3</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#c7d2fe">Interactive console featuring 1-click<BR/>scenarios, live Chicago map, 7-part match<BR/>briefs, and smartphone SMS simulator.</FONT></TD></TR></TABLE>>;
    margin = "0.223,0.223";
    width = 4.445;
    height = 2.5;
    fillcolor = "#6366f1";
    fontcolor = "#eef2ff";
    color = "#4f46e5";
  ];
  "api-backend" [
    likec4_id = "broker.api-backend";
    likec4_level = 0;
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">FastAPI Dispatch Service</FONT></TD></TR><TR><TD><FONT POINT-SIZE="13" COLOR="#c7d2fe">Python 3.11, FastAPI, Uvicorn</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#c7d2fe">REST API handling match requests, fallback<BR/>cascading, live equity audits, and pantry<BR/>onboarding.</FONT></TD></TR></TABLE>>;
    margin = "0.223,0.223";
    width = 4.445;
    height = 2.5;
    fillcolor = "#6366f1";
    fontcolor = "#eef2ff";
    color = "#4f46e5";
  ];
  "intake-agent" [
    likec4_id = "broker.agent-engine.intake-agent";
    likec4_level = 0;
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">Conversational Pantry Intake Agent</FONT></TD></TR><TR><TD><FONT POINT-SIZE="13" COLOR="#B6ECF7">Conversational Subagent</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#B6ECF7">Interviews new pantry coordinators, extracts<BR/>capacity schemas, and generates profile<BR/>texts.</FONT></TD></TR></TABLE>>;
    margin = "0.5,0.223";
    width = 4.584;
    height = 2.5;
    fillcolor = "#0284c7";
    fontcolor = "#f0f9ff";
    color = "#0369a1";
  ];
  "gemini" [
    likec4_id = "gemini";
    likec4_level = 0;
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">Google Gemini (Vertex AI)</FONT></TD></TR><TR><TD><FONT POINT-SIZE="13" COLOR="#cbd5e1">Gemini 2.5/3.8 Flash, Vertex AI</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#cbd5e1">Foundation LLM providing multi-step<BR/>reasoning, match-brief synthesis, and<BR/>conversational intake.</FONT></TD></TR></TABLE>>;
    margin = "0.223,0.223";
    width = 4.445;
    height = 2.5;
    fillcolor = "#64748b";
    fontcolor = "#f8fafc";
    color = "#475569";
  ];
  "recipients-data" [
    likec4_id = "broker.bigquery.recipients-data";
    likec4_level = 0;
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">Recipients &amp; Capacities Table</FONT></TD></TR><TR><TD><FONT POINT-SIZE="13" COLOR="#B6ECF7">BigQuery Table</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#B6ECF7">Stores organizations, walk-in cold storage<BR/>capacity, pickup windows, and embedding<BR/>vectors.</FONT></TD></TR></TABLE>>;
    margin = "0.5,0.223";
    width = 4.584;
    height = 2.5;
    fillcolor = "#0284c7";
    fontcolor = "#f0f9ff";
    color = "#0369a1";
  ];
  "pantry" -> "web-ui" [
    likec4_id = "step-01";
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="3"><TR><TD><TABLE BORDER="0" CELLPADDING="6" BGCOLOR="#18191BA0"><TR><TD WIDTH="20" HEIGHT="20"><FONT POINT-SIZE="14"><B>0</B></FONT></TD></TR></TABLE></TD><TD BGCOLOR="#18191BA0" CELLPADDING="3"><FONT POINT-SIZE="14">1. Enters pantry details in<BR/>conversational onboarding modal</FONT></TD></TR></TABLE>>;
    arrowhead = "normal";
  ];
  "web-ui" -> "api-backend" [
    likec4_id = "step-02";
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="3"><TR><TD><TABLE BORDER="0" CELLPADDING="6" BGCOLOR="#18191BA0"><TR><TD WIDTH="20" HEIGHT="20"><FONT POINT-SIZE="14"><B>1</B></FONT></TD></TR></TABLE></TD><TD BGCOLOR="#18191BA0" CELLPADDING="3"><FONT POINT-SIZE="14">2. POST /api/intake<BR/>HTTPS / JSON REST</FONT></TD></TR></TABLE>>;
    arrowhead = "normal";
  ];
  "api-backend" -> "intake-agent" [
    likec4_id = "step-03";
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="3"><TR><TD><TABLE BORDER="0" CELLPADDING="6" BGCOLOR="#18191BA0"><TR><TD WIDTH="20" HEIGHT="20"><FONT POINT-SIZE="14"><B>2</B></FONT></TD></TR></TABLE></TD><TD BGCOLOR="#18191BA0" CELLPADDING="3"><FONT POINT-SIZE="14">3. Forward transcript to intake subagent</FONT></TD></TR></TABLE>>;
    arrowhead = "normal";
  ];
  "intake-agent" -> "gemini" [
    likec4_id = "step-04";
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="3"><TR><TD><TABLE BORDER="0" CELLPADDING="6" BGCOLOR="#18191BA0"><TR><TD WIDTH="20" HEIGHT="20"><FONT POINT-SIZE="14"><B>3</B></FONT></TD></TR></TABLE></TD><TD BGCOLOR="#18191BA0" CELLPADDING="3"><FONT POINT-SIZE="14">4. Extract structured capacity schema &amp;<BR/>synthesize profile<BR/>gRPC / HTTPS</FONT></TD></TR></TABLE>>;
    arrowhead = "normal";
  ];
  "intake-agent" -> "gemini" [
    likec4_id = "step-05";
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="3"><TR><TD><TABLE BORDER="0" CELLPADDING="6" BGCOLOR="#18191BA0"><TR><TD WIDTH="20" HEIGHT="20"><FONT POINT-SIZE="14"><B>4</B></FONT></TD></TR></TABLE></TD><TD BGCOLOR="#18191BA0" CELLPADDING="3"><FONT POINT-SIZE="14">5. Generate vector embeddings<BR/>gRPC / HTTPS</FONT></TD></TR></TABLE>>;
    arrowhead = "normal";
  ];
  "intake-agent" -> "recipients-data" [
    likec4_id = "step-06";
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="3"><TR><TD><TABLE BORDER="0" CELLPADDING="6" BGCOLOR="#18191BA0"><TR><TD WIDTH="20" HEIGHT="20"><FONT POINT-SIZE="14"><B>5</B></FONT></TD></TR></TABLE></TD><TD BGCOLOR="#18191BA0" CELLPADDING="3"><FONT POINT-SIZE="14">6. Insert new recipient row with<BR/>embeddings</FONT></TD></TR></TABLE>>;
    arrowhead = "normal";
  ];
  "web-ui" -> "api-backend" [
    likec4_id = "step-07";
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="3"><TR><TD><TABLE BORDER="0" CELLPADDING="6" BGCOLOR="#18191BA0"><TR><TD WIDTH="20" HEIGHT="20"><FONT POINT-SIZE="14"><B>6</B></FONT></TD></TR></TABLE></TD><TD BGCOLOR="#18191BA0" CELLPADDING="3"><FONT POINT-SIZE="14">7. Confirmation: Pantry is now live and<BR/>searchable!</FONT></TD></TR></TABLE>>;
    arrowtail = "normal";
    dir = "back";
  ];
}`;case`production`:return`digraph {
  likec4_viewId = "production";
  bgcolor = "transparent";
  layout = "dot";
  compound = true;
  rankdir = "TB";
  splines = "spline";
  outputorder = "nodesfirst";
  nodesep = 1.806;
  ranksep = 1.806;
  pad = 0.209;
  fontname = "Arial";
  newrank = true;
  clusterrank = "global";
  graph [
    fontsize = 20;
    labeljust = "l";
    labelloc = "t";
  ];
  edge [
    arrowsize = 0.75;
    fontname = "Arial";
    fontsize = 14;
    penwidth = 2;
    color = "#8D8D8D";
    fontcolor = "#C9C9C9";
    style = "dashed";
  ];
  node [
    fontname = "Arial";
    shape = "rect";
    fillcolor = "#3b82f6";
    fontcolor = "#eff6ff";
    color = "#2563eb";
    style = "filled";
    penwidth = 0;
  ];
  "gcp" [
    likec4_id = "gcp";
    likec4_level = 0;
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">Google Cloud Platform<BR/>(qwiklabs-gcp-04-300332596f08)</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#cbd5e1">Production infrastructure hosted on Google<BR/>Cloud Platform.</FONT></TD></TR></TABLE>>;
    margin = "0.223,0.223";
    width = 4.445;
    height = 2.5;
    fillcolor = "#64748b";
    fontcolor = "#f8fafc";
    color = "#475569";
  ];
  "devices" [
    likec4_id = "devices";
    likec4_level = 0;
    label = <<FONT POINT-SIZE="20">End User Devices</FONT>>;
    margin = "0.223,0.223";
    width = 4.445;
    height = 2.5;
    fillcolor = "#64748b";
    fontcolor = "#f8fafc";
    color = "#475569";
  ];
}`;default:throw Error(`Unknown viewId: `+e)}},t=e=>{switch(e){case`index`:return`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
 "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<!-- Generated by graphviz version 16.1.0 (0)
 -->
<!-- Pages: 1 -->
<svg width="1671pt" height="910pt"
 viewBox="0.00 0.00 1671.00 910.00" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g id="graph0" class="graph" transform="scale(1 1) rotate(0) translate(15.05 894.65)">
<!-- donor -->
<g id="node1" class="node">
<title>donor</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="323.04,-879.6 3,-879.6 3,-699.6 323.04,-699.6 323.04,-879.6"/>
<text xml:space="preserve" text-anchor="start" x="110.21" y="-801.6" font-family="Arial" font-size="20.00" fill="#f8fafc">Food Donor</text>
<text xml:space="preserve" text-anchor="start" x="23.38" y="-778.6" font-family="Arial" font-size="15.00" fill="#cbd5e1">Grocers, restaurants, and farmers offering</text>
<text xml:space="preserve" text-anchor="start" x="35.87" y="-760.6" font-family="Arial" font-size="15.00" fill="#cbd5e1">surplus food on tight expiration clocks.</text>
</g>
<!-- broker -->
<g id="node2" class="node">
<title>broker</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="985.98,-540 644.06,-540 644.06,-360 985.98,-360 985.98,-540"/>
<text xml:space="preserve" text-anchor="start" x="683.29" y="-471" font-family="Arial" font-size="20.00" fill="#eff6ff">Food Equity &amp; Surplus Broker</text>
<text xml:space="preserve" text-anchor="start" x="664.12" y="-448" font-family="Arial" font-size="15.00" fill="#bfdbfe">Real&#45;time broker matching perishable surplus</text>
<text xml:space="preserve" text-anchor="start" x="670.79" y="-430" font-family="Arial" font-size="15.00" fill="#bfdbfe">with verified community pantries under tight</text>
<text xml:space="preserve" text-anchor="start" x="792.1" y="-412" font-family="Arial" font-size="15.00" fill="#bfdbfe">clocks.</text>
</g>
<!-- coordinator -->
<g id="node3" class="node">
<title>coordinator</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="753.04,-879.6 433,-879.6 433,-699.6 753.04,-699.6 753.04,-879.6"/>
<text xml:space="preserve" text-anchor="start" x="504.08" y="-810.6" font-family="Arial" font-size="20.00" fill="#f8fafc">Rescue Coordinator</text>
<text xml:space="preserve" text-anchor="start" x="463.37" y="-787.6" font-family="Arial" font-size="15.00" fill="#cbd5e1">Dispatchers overseeing food matching,</text>
<text xml:space="preserve" text-anchor="start" x="460.86" y="-769.6" font-family="Arial" font-size="15.00" fill="#cbd5e1">resolving declines, and reviewing equity</text>
<text xml:space="preserve" text-anchor="start" x="572.6" y="-751.6" font-family="Arial" font-size="15.00" fill="#cbd5e1">briefs.</text>
</g>
<!-- pantry -->
<g id="node4" class="node">
<title>pantry</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1210.92,-879.6 863.12,-879.6 863.12,-699.6 1210.92,-699.6 1210.92,-879.6"/>
<text xml:space="preserve" text-anchor="start" x="962.53" y="-801.6" font-family="Arial" font-size="20.00" fill="#f8fafc">Pantry Volunteer</text>
<text xml:space="preserve" text-anchor="start" x="899.03" y="-778.6" font-family="Arial" font-size="15.00" fill="#cbd5e1">Pantry coordinators and shelter operators</text>
<text xml:space="preserve" text-anchor="start" x="883.17" y="-760.6" font-family="Arial" font-size="15.00" fill="#cbd5e1">receiving dispatches and onboarding capacity.</text>
</g>
<!-- driver -->
<g id="node5" class="node">
<title>driver</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1641.04,-879.6 1321,-879.6 1321,-699.6 1641.04,-699.6 1641.04,-879.6"/>
<text xml:space="preserve" text-anchor="start" x="1415.46" y="-801.6" font-family="Arial" font-size="20.00" fill="#f8fafc">Delivery Driver</text>
<text xml:space="preserve" text-anchor="start" x="1345.13" y="-778.6" font-family="Arial" font-size="15.00" fill="#cbd5e1">Volunteer drivers picking up surplus from</text>
<text xml:space="preserve" text-anchor="start" x="1352.19" y="-760.6" font-family="Arial" font-size="15.00" fill="#cbd5e1">donor docks and delivering to pantries.</text>
</g>
<!-- gemini -->
<g id="node6" class="node">
<title>gemini</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="320.04,-180 0,-180 0,0 320.04,0 320.04,-180"/>
<text xml:space="preserve" text-anchor="start" x="42.75" y="-120.8" font-family="Arial" font-size="20.00" fill="#f8fafc">Google Gemini (Vertex AI)</text>
<text xml:space="preserve" text-anchor="start" x="69.7" y="-99.8" font-family="Arial" font-size="13.00" fill="#cbd5e1">Gemini 2.5/3.8 Flash, Vertex AI</text>
<text xml:space="preserve" text-anchor="start" x="38.71" y="-78.2" font-family="Arial" font-size="15.00" fill="#cbd5e1">Foundation LLM providing multi&#45;step</text>
<text xml:space="preserve" text-anchor="start" x="35.37" y="-60.2" font-family="Arial" font-size="15.00" fill="#cbd5e1">reasoning, match&#45;brief synthesis, and</text>
<text xml:space="preserve" text-anchor="start" x="87.48" y="-42.2" font-family="Arial" font-size="15.00" fill="#cbd5e1">conversational intake.</text>
</g>
<!-- openfda -->
<g id="node7" class="node">
<title>openfda</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="763.82,-180 430.22,-180 430.22,0 763.82,0 763.82,-180"/>
<text xml:space="preserve" text-anchor="start" x="479.18" y="-120.8" font-family="Arial" font-size="20.00" fill="#f8fafc">openFDA Food Safety API</text>
<text xml:space="preserve" text-anchor="start" x="531.99" y="-99.8" font-family="Arial" font-size="13.00" fill="#cbd5e1">REST API, api.fda.gov</text>
<text xml:space="preserve" text-anchor="start" x="450.27" y="-78.2" font-family="Arial" font-size="15.00" fill="#cbd5e1">Federal enforcement feed screening surplus</text>
<text xml:space="preserve" text-anchor="start" x="472.36" y="-60.2" font-family="Arial" font-size="15.00" fill="#cbd5e1">food for active recalls and undeclared</text>
<text xml:space="preserve" text-anchor="start" x="564.5" y="-42.2" font-family="Arial" font-size="15.00" fill="#cbd5e1">allergens.</text>
</g>
<!-- chicago&#45;traffic -->
<g id="node8" class="node">
<title>chicago&#45;traffic</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1194.04,-180 874,-180 874,0 1194.04,0 1194.04,-180"/>
<text xml:space="preserve" text-anchor="start" x="898.99" y="-111.8" font-family="Arial" font-size="20.00" fill="#f8fafc">City of Chicago Traffic Tracker</text>
<text xml:space="preserve" text-anchor="start" x="949.49" y="-90.8" font-family="Arial" font-size="13.00" fill="#cbd5e1">Civic Open Data API / OSRM</text>
<text xml:space="preserve" text-anchor="start" x="899.36" y="-69.2" font-family="Arial" font-size="15.00" fill="#cbd5e1">Live congestion and arterial traffic speed</text>
<text xml:space="preserve" text-anchor="start" x="926.05" y="-51.2" font-family="Arial" font-size="15.00" fill="#cbd5e1">feed for transit ETA calculations.</text>
</g>
<!-- osm&#45;tiles -->
<g id="node9" class="node">
<title>osm&#45;tiles</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1624.04,-180 1304,-180 1304,0 1624.04,0 1624.04,-180"/>
<text xml:space="preserve" text-anchor="start" x="1338.41" y="-111.8" font-family="Arial" font-size="20.00" fill="#f8fafc">OpenStreetMap Tile Service</text>
<text xml:space="preserve" text-anchor="start" x="1428.62" y="-90.8" font-family="Arial" font-size="13.00" fill="#cbd5e1">Leaflet CDN</text>
<text xml:space="preserve" text-anchor="start" x="1345.21" y="-69.2" font-family="Arial" font-size="15.00" fill="#cbd5e1">Map tile provider rendering Chicago</text>
<text xml:space="preserve" text-anchor="start" x="1327.7" y="-51.2" font-family="Arial" font-size="15.00" fill="#cbd5e1">geospatial layers, tracts, and pantry pins.</text>
</g>
<!-- donor&#45;&gt;broker -->
<g id="edge1" class="edge">
<title>donor&#45;&gt;broker</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M252.42,-699.81C291.03,-665.1 338.24,-627.18 385.91,-600 463.1,-555.99 555.46,-521.85 634.69,-497.43"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="634.99,-500.08 641.39,-495.38 633.45,-495.06 634.99,-500.08"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="385.91,-600 385.91,-639.6 609.02,-639.6 609.02,-600 385.91,-600"/>
<text xml:space="preserve" text-anchor="start" x="388.91" y="-622.6" font-family="Arial" font-size="14.00" fill="#c9c9c9">Submits surplus offer with deadline</text>
<text xml:space="preserve" text-anchor="start" x="388.91" y="-605.8" font-family="Arial" font-size="14.00" fill="#c9c9c9">clock</text>
</g>
<!-- broker&#45;&gt;gemini -->
<g id="edge5" class="edge">
<title>broker&#45;&gt;gemini</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M644.41,-365.99C602.58,-344.99 558.11,-322.1 517.34,-300 450.51,-263.78 377.9,-221.81 315.7,-185.02"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="317.39,-182.97 309.6,-181.41 314.72,-187.49 317.39,-182.97"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="517.34,-248.4 517.34,-291.6 618.02,-291.6 618.02,-248.4 517.34,-248.4"/>
<text xml:space="preserve" text-anchor="start" x="520.34" y="-277" font-family="Arial" font-weight="bold" font-size="14.00" fill="#c9c9c9">[...]</text>
<text xml:space="preserve" text-anchor="start" x="520.34" y="-253.8" font-family="Arial" font-size="12.00" fill="#c9c9c9">[ gRPC / HTTPS ]</text>
</g>
<!-- broker&#45;&gt;openfda -->
<g id="edge6" class="edge">
<title>broker&#45;&gt;openfda</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M722.02,-360.21C705.37,-341.38 689.21,-320.87 676.24,-300 655.18,-266.12 638.26,-225.74 625.55,-189.55"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="628.15,-189.05 623.23,-182.82 623.19,-190.76 628.15,-189.05"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="676.24,-240 676.24,-300 897.02,-300 897.02,-240 676.24,-240"/>
<text xml:space="preserve" text-anchor="start" x="679.24" y="-283" font-family="Arial" font-size="14.00" fill="#c9c9c9">Screens food description for active</text>
<text xml:space="preserve" text-anchor="start" x="679.24" y="-266.2" font-family="Arial" font-size="14.00" fill="#c9c9c9">recalls</text>
<text xml:space="preserve" text-anchor="start" x="679.24" y="-245.4" font-family="Arial" font-size="12.00" fill="#c9c9c9">[ HTTPS REST ]</text>
</g>
<!-- broker&#45;&gt;chicago&#45;traffic -->
<g id="edge7" class="edge">
<title>broker&#45;&gt;chicago&#45;traffic</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M880.01,-360.3C893.66,-340.72 907.65,-319.88 920.02,-300 942.11,-264.49 964.55,-224.41 983.61,-188.91"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="985.73,-190.51 986.95,-182.66 981.1,-188.03 985.73,-190.51"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="953.34,-248.4 953.34,-291.6 1202.91,-291.6 1202.91,-248.4 953.34,-248.4"/>
<text xml:space="preserve" text-anchor="start" x="956.34" y="-274.6" font-family="Arial" font-size="14.00" fill="#c9c9c9">Retrieves live street congestion speeds</text>
<text xml:space="preserve" text-anchor="start" x="956.34" y="-253.8" font-family="Arial" font-size="12.00" fill="#c9c9c9">[ HTTPS REST ]</text>
</g>
<!-- broker&#45;&gt;osm&#45;tiles -->
<g id="edge8" class="edge">
<title>broker&#45;&gt;osm&#45;tiles</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M985.94,-403.93C1063.54,-379.44 1154.62,-344.88 1230.02,-300 1281.69,-269.25 1332.3,-226.16 1373.17,-187.09"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="1374.92,-189.04 1378.5,-181.95 1371.28,-185.26 1374.92,-189.04"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1313.82,-248.4 1313.82,-291.6 1484.78,-291.6 1484.78,-248.4 1313.82,-248.4"/>
<text xml:space="preserve" text-anchor="start" x="1316.82" y="-274.6" font-family="Arial" font-size="14.00" fill="#c9c9c9">Fetches Chicago map tiles</text>
<text xml:space="preserve" text-anchor="start" x="1316.82" y="-253.8" font-family="Arial" font-size="12.00" fill="#c9c9c9">[ HTTPS ]</text>
</g>
<!-- coordinator&#45;&gt;broker -->
<g id="edge2" class="edge">
<title>coordinator&#45;&gt;broker</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M613.32,-699.6C623.27,-666.69 637.38,-630.1 656.7,-600 668.55,-581.55 683.17,-563.79 698.7,-547.37"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="700.47,-549.32 703.79,-542.1 696.7,-545.67 700.47,-549.32"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="656.7,-600 656.7,-639.6 900.02,-639.6 900.02,-600 656.7,-600"/>
<text xml:space="preserve" text-anchor="start" x="659.7" y="-622.6" font-family="Arial" font-size="14.00" fill="#c9c9c9">Reviews match brief, inspects decoys,</text>
<text xml:space="preserve" text-anchor="start" x="659.7" y="-605.8" font-family="Arial" font-size="14.00" fill="#c9c9c9">and triggers dispatches</text>
</g>
<!-- pantry&#45;&gt;broker -->
<g id="edge3" class="edge">
<title>pantry&#45;&gt;broker</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M985.45,-699.85C966.4,-668 944.27,-632.05 923.02,-600 911.79,-583.07 899.48,-565.35 887.31,-548.29"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="889.62,-547 883.12,-542.43 885.35,-550.06 889.62,-547"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="945.91,-600 945.91,-639.6 1201.72,-639.6 1201.72,-600 945.91,-600"/>
<text xml:space="preserve" text-anchor="start" x="948.91" y="-622.6" font-family="Arial" font-size="14.00" fill="#c9c9c9">Onboards new pantry via conversational</text>
<text xml:space="preserve" text-anchor="start" x="948.91" y="-605.8" font-family="Arial" font-size="14.00" fill="#c9c9c9">interview</text>
</g>
<!-- driver&#45;&gt;broker -->
<g id="edge4" class="edge">
<title>driver&#45;&gt;broker</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M1376.92,-699.72C1333.22,-665.39 1280.62,-627.79 1229.02,-600 1155.88,-560.62 1070.18,-527.81 995.78,-503.09"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="996.65,-500.61 988.71,-500.76 995.01,-505.6 996.65,-500.61"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1288.03,-600 1288.03,-639.6 1546.16,-639.6 1546.16,-600 1288.03,-600"/>
<text xml:space="preserve" text-anchor="start" x="1291.03" y="-622.6" font-family="Arial" font-size="14.00" fill="#c9c9c9">Receives turn&#45;by&#45;turn routing and pickup</text>
<text xml:space="preserve" text-anchor="start" x="1291.03" y="-605.8" font-family="Arial" font-size="14.00" fill="#c9c9c9">alerts</text>
</g>
</g>
</svg>
`;case`containers`:return`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
 "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<!-- Generated by graphviz version 16.1.0 (0)
 -->
<!-- Pages: 1 -->
<svg width="2253pt" height="2010pt"
 viewBox="0.00 0.00 2253.00 2010.00" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g id="graph0" class="graph" transform="scale(1 1) rotate(0) translate(15.05 1994.65)">
<g id="clust1" class="cluster">
<title>cluster_broker</title>
<polygon fill="#194b9e" stroke="#1b3d88" points="8,-8 8,-1692 1419,-1692 1419,-8 8,-8"/>
<text xml:space="preserve" text-anchor="start" x="16" y="-1679.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">FOOD EQUITY &amp; SURPLUS BROKER</text>
</g>
<!-- web&#45;ui -->
<g id="node1" class="node">
<title>web&#45;ui</title>
<polygon fill="#6366f1" stroke="#4f46e5" stroke-width="0" points="1165.12,-1630.8 844.88,-1630.8 844.88,-1450.8 1165.12,-1450.8 1165.12,-1630.8"/>
<text xml:space="preserve" text-anchor="start" x="869.38" y="-1571.6" font-family="Arial" font-size="20.00" fill="#eef2ff">RescueDispatch Web Console</text>
<text xml:space="preserve" text-anchor="start" x="933.47" y="-1550.6" font-family="Arial" font-size="13.00" fill="#c7d2fe">HTML5, Leaflet.js, CSS3</text>
<text xml:space="preserve" text-anchor="start" x="887.86" y="-1529" font-family="Arial" font-size="15.00" fill="#c7d2fe">Interactive console featuring 1&#45;click</text>
<text xml:space="preserve" text-anchor="start" x="864.94" y="-1511" font-family="Arial" font-size="15.00" fill="#c7d2fe">scenarios, live Chicago map, 7&#45;part match</text>
<text xml:space="preserve" text-anchor="start" x="875.36" y="-1493" font-family="Arial" font-size="15.00" fill="#c7d2fe">briefs, and smartphone SMS simulator.</text>
</g>
<!-- api&#45;backend -->
<g id="node2" class="node">
<title>api&#45;backend</title>
<polygon fill="#6366f1" stroke="#4f46e5" stroke-width="0" points="1172.63,-1270.8 837.37,-1270.8 837.37,-1090.8 1172.63,-1090.8 1172.63,-1270.8"/>
<text xml:space="preserve" text-anchor="start" x="891.63" y="-1211.6" font-family="Arial" font-size="20.00" fill="#eef2ff">FastAPI Dispatch Service</text>
<text xml:space="preserve" text-anchor="start" x="917.93" y="-1190.6" font-family="Arial" font-size="13.00" fill="#c7d2fe">Python 3.11, FastAPI, Uvicorn</text>
<text xml:space="preserve" text-anchor="start" x="857.43" y="-1169" font-family="Arial" font-size="15.00" fill="#c7d2fe">REST API handling match requests, fallback</text>
<text xml:space="preserve" text-anchor="start" x="872" y="-1151" font-family="Arial" font-size="15.00" fill="#c7d2fe">cascading, live equity audits, and pantry</text>
<text xml:space="preserve" text-anchor="start" x="965.38" y="-1133" font-family="Arial" font-size="15.00" fill="#c7d2fe">onboarding.</text>
</g>
<!-- agent&#45;engine -->
<g id="node3" class="node">
<title>agent&#45;engine</title>
<polygon fill="#6366f1" stroke="#4f46e5" stroke-width="0" points="901.97,-931.2 580.03,-931.2 580.03,-751.2 901.97,-751.2 901.97,-931.2"/>
<text xml:space="preserve" text-anchor="start" x="607.02" y="-872" font-family="Arial" font-size="20.00" fill="#eef2ff">ADK Agent Reasoning Engine</text>
<text xml:space="preserve" text-anchor="start" x="681.02" y="-851" font-family="Arial" font-size="13.00" fill="#c7d2fe">Google ADK, Python</text>
<text xml:space="preserve" text-anchor="start" x="600.09" y="-829.4" font-family="Arial" font-size="15.00" fill="#c7d2fe">Autonomous reasoning layer orchestrating</text>
<text xml:space="preserve" text-anchor="start" x="624.27" y="-811.4" font-family="Arial" font-size="15.00" fill="#c7d2fe">multi&#45;step coordinator inquiries and</text>
<text xml:space="preserve" text-anchor="start" x="701.38" y="-793.4" font-family="Arial" font-size="15.00" fill="#c7d2fe">onboarding.</text>
</g>
<!-- logistics&#45;tools -->
<g id="node4" class="node">
<title>logistics&#45;tools</title>
<polygon fill="#6366f1" stroke="#4f46e5" stroke-width="0" points="1379.02,-588 1058.98,-588 1058.98,-408 1379.02,-408 1379.02,-588"/>
<text xml:space="preserve" text-anchor="start" x="1107.84" y="-528.8" font-family="Arial" font-size="20.00" fill="#eef2ff">Uber Logistics Tool Suite</text>
<text xml:space="preserve" text-anchor="start" x="1184.31" y="-507.8" font-family="Arial" font-size="13.00" fill="#c7d2fe">Python 3.11</text>
<text xml:space="preserve" text-anchor="start" x="1082.27" y="-486.2" font-family="Arial" font-size="15.00" fill="#c7d2fe">Deterministic domain tools enforcing cold</text>
<text xml:space="preserve" text-anchor="start" x="1080.6" y="-468.2" font-family="Arial" font-size="15.00" fill="#c7d2fe">chain physics, safety margins, and spatial</text>
<text xml:space="preserve" text-anchor="start" x="1196.9" y="-450.2" font-family="Arial" font-size="15.00" fill="#c7d2fe">equity.</text>
</g>
<!-- mcp&#45;toolbox -->
<g id="node5" class="node">
<title>mcp&#45;toolbox</title>
<polygon fill="#6366f1" stroke="#4f46e5" stroke-width="0" points="948.97,-588 587.03,-588 587.03,-408 948.97,-408 948.97,-588"/>
<text xml:space="preserve" text-anchor="start" x="661.84" y="-528.8" font-family="Arial" font-size="20.00" fill="#eef2ff">MCP Database Toolbox</text>
<text xml:space="preserve" text-anchor="start" x="644.8" y="-507.8" font-family="Arial" font-size="13.00" fill="#c7d2fe">Google Cloud MCP Toolbox for Databases</text>
<text xml:space="preserve" text-anchor="start" x="607.08" y="-486.2" font-family="Arial" font-size="15.00" fill="#c7d2fe">Google&#45;managed Model Context Protocol server</text>
<text xml:space="preserve" text-anchor="start" x="623.75" y="-468.2" font-family="Arial" font-size="15.00" fill="#c7d2fe">exposing BigQuery schema and SQL query</text>
<text xml:space="preserve" text-anchor="start" x="733.81" y="-450.2" font-family="Arial" font-size="15.00" fill="#c7d2fe">execution.</text>
</g>
<!-- bigquery -->
<g id="node6" class="node">
<title>bigquery</title>
<path fill="#3b82f6" stroke="#2563eb" stroke-width="2" d="M578.46,-211.64C578.46,-220.67 496.23,-228 395,-228 293.77,-228 211.54,-220.67 211.54,-211.64 211.54,-211.64 211.54,-64.36 211.54,-64.36 211.54,-55.33 293.77,-48 395,-48 496.23,-48 578.46,-55.33 578.46,-64.36 578.46,-64.36 578.46,-211.64 578.46,-211.64"/>
<path fill="none" stroke="#2563eb" stroke-width="2" d="M578.46,-211.64C578.46,-202.61 496.23,-195.27 395,-195.27 293.77,-195.27 211.54,-202.61 211.54,-211.64"/>
<text xml:space="preserve" text-anchor="start" x="231.59" y="-168.8" font-family="Arial" font-size="20.00" fill="#eff6ff">BigQuery Warehouse &amp; Vector Store</text>
<text xml:space="preserve" text-anchor="start" x="272.15" y="-147.8" font-family="Arial" font-size="13.00" fill="#bfdbfe">Google Cloud BigQuery (a4i_food dataset)</text>
<text xml:space="preserve" text-anchor="start" x="269.1" y="-126.2" font-family="Arial" font-size="15.00" fill="#bfdbfe">Analytical warehouse storing recipient</text>
<text xml:space="preserve" text-anchor="start" x="250.78" y="-108.2" font-family="Arial" font-size="15.00" fill="#bfdbfe">profiles, census tracts, USDA shelf&#45;life, and</text>
<text xml:space="preserve" text-anchor="start" x="329.55" y="-90.2" font-family="Arial" font-size="15.00" fill="#bfdbfe">vector embeddings.</text>
</g>
<!-- donor -->
<g id="node7" class="node">
<title>donor</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="513.02,-1979.6 192.98,-1979.6 192.98,-1799.6 513.02,-1799.6 513.02,-1979.6"/>
<text xml:space="preserve" text-anchor="start" x="300.19" y="-1901.6" font-family="Arial" font-size="20.00" fill="#f8fafc">Food Donor</text>
<text xml:space="preserve" text-anchor="start" x="213.36" y="-1878.6" font-family="Arial" font-size="15.00" fill="#cbd5e1">Grocers, restaurants, and farmers offering</text>
<text xml:space="preserve" text-anchor="start" x="225.85" y="-1860.6" font-family="Arial" font-size="15.00" fill="#cbd5e1">surplus food on tight expiration clocks.</text>
</g>
<!-- coordinator -->
<g id="node8" class="node">
<title>coordinator</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="943.02,-1979.6 622.98,-1979.6 622.98,-1799.6 943.02,-1799.6 943.02,-1979.6"/>
<text xml:space="preserve" text-anchor="start" x="694.06" y="-1910.6" font-family="Arial" font-size="20.00" fill="#f8fafc">Rescue Coordinator</text>
<text xml:space="preserve" text-anchor="start" x="653.35" y="-1887.6" font-family="Arial" font-size="15.00" fill="#cbd5e1">Dispatchers overseeing food matching,</text>
<text xml:space="preserve" text-anchor="start" x="650.84" y="-1869.6" font-family="Arial" font-size="15.00" fill="#cbd5e1">resolving declines, and reviewing equity</text>
<text xml:space="preserve" text-anchor="start" x="762.58" y="-1851.6" font-family="Arial" font-size="15.00" fill="#cbd5e1">briefs.</text>
</g>
<!-- pantry -->
<g id="node9" class="node">
<title>pantry</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1400.9,-1979.6 1053.1,-1979.6 1053.1,-1799.6 1400.9,-1799.6 1400.9,-1979.6"/>
<text xml:space="preserve" text-anchor="start" x="1152.51" y="-1901.6" font-family="Arial" font-size="20.00" fill="#f8fafc">Pantry Volunteer</text>
<text xml:space="preserve" text-anchor="start" x="1089.01" y="-1878.6" font-family="Arial" font-size="15.00" fill="#cbd5e1">Pantry coordinators and shelter operators</text>
<text xml:space="preserve" text-anchor="start" x="1073.15" y="-1860.6" font-family="Arial" font-size="15.00" fill="#cbd5e1">receiving dispatches and onboarding capacity.</text>
</g>
<!-- driver -->
<g id="node10" class="node">
<title>driver</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1831.02,-1979.6 1510.98,-1979.6 1510.98,-1799.6 1831.02,-1799.6 1831.02,-1979.6"/>
<text xml:space="preserve" text-anchor="start" x="1605.44" y="-1901.6" font-family="Arial" font-size="20.00" fill="#f8fafc">Delivery Driver</text>
<text xml:space="preserve" text-anchor="start" x="1535.11" y="-1878.6" font-family="Arial" font-size="15.00" fill="#cbd5e1">Volunteer drivers picking up surplus from</text>
<text xml:space="preserve" text-anchor="start" x="1542.17" y="-1860.6" font-family="Arial" font-size="15.00" fill="#cbd5e1">donor docks and delivering to pantries.</text>
</g>
<!-- osm&#45;tiles -->
<g id="node11" class="node">
<title>osm&#45;tiles</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1779.02,-1270.8 1458.98,-1270.8 1458.98,-1090.8 1779.02,-1090.8 1779.02,-1270.8"/>
<text xml:space="preserve" text-anchor="start" x="1493.39" y="-1202.6" font-family="Arial" font-size="20.00" fill="#f8fafc">OpenStreetMap Tile Service</text>
<text xml:space="preserve" text-anchor="start" x="1583.6" y="-1181.6" font-family="Arial" font-size="13.00" fill="#cbd5e1">Leaflet CDN</text>
<text xml:space="preserve" text-anchor="start" x="1500.19" y="-1160" font-family="Arial" font-size="15.00" fill="#cbd5e1">Map tile provider rendering Chicago</text>
<text xml:space="preserve" text-anchor="start" x="1482.68" y="-1142" font-family="Arial" font-size="15.00" fill="#cbd5e1">geospatial layers, tracts, and pantry pins.</text>
</g>
<!-- gemini -->
<g id="node12" class="node">
<title>gemini</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1809.02,-588 1488.98,-588 1488.98,-408 1809.02,-408 1809.02,-588"/>
<text xml:space="preserve" text-anchor="start" x="1531.73" y="-528.8" font-family="Arial" font-size="20.00" fill="#f8fafc">Google Gemini (Vertex AI)</text>
<text xml:space="preserve" text-anchor="start" x="1558.68" y="-507.8" font-family="Arial" font-size="13.00" fill="#cbd5e1">Gemini 2.5/3.8 Flash, Vertex AI</text>
<text xml:space="preserve" text-anchor="start" x="1527.69" y="-486.2" font-family="Arial" font-size="15.00" fill="#cbd5e1">Foundation LLM providing multi&#45;step</text>
<text xml:space="preserve" text-anchor="start" x="1524.35" y="-468.2" font-family="Arial" font-size="15.00" fill="#cbd5e1">reasoning, match&#45;brief synthesis, and</text>
<text xml:space="preserve" text-anchor="start" x="1576.46" y="-450.2" font-family="Arial" font-size="15.00" fill="#cbd5e1">conversational intake.</text>
</g>
<!-- openfda -->
<g id="node13" class="node">
<title>openfda</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1792.8,-228 1459.2,-228 1459.2,-48 1792.8,-48 1792.8,-228"/>
<text xml:space="preserve" text-anchor="start" x="1508.16" y="-168.8" font-family="Arial" font-size="20.00" fill="#f8fafc">openFDA Food Safety API</text>
<text xml:space="preserve" text-anchor="start" x="1560.97" y="-147.8" font-family="Arial" font-size="13.00" fill="#cbd5e1">REST API, api.fda.gov</text>
<text xml:space="preserve" text-anchor="start" x="1479.25" y="-126.2" font-family="Arial" font-size="15.00" fill="#cbd5e1">Federal enforcement feed screening surplus</text>
<text xml:space="preserve" text-anchor="start" x="1501.34" y="-108.2" font-family="Arial" font-size="15.00" fill="#cbd5e1">food for active recalls and undeclared</text>
<text xml:space="preserve" text-anchor="start" x="1593.48" y="-90.2" font-family="Arial" font-size="15.00" fill="#cbd5e1">allergens.</text>
</g>
<!-- chicago&#45;traffic -->
<g id="node14" class="node">
<title>chicago&#45;traffic</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="2223.02,-228 1902.98,-228 1902.98,-48 2223.02,-48 2223.02,-228"/>
<text xml:space="preserve" text-anchor="start" x="1927.97" y="-159.8" font-family="Arial" font-size="20.00" fill="#f8fafc">City of Chicago Traffic Tracker</text>
<text xml:space="preserve" text-anchor="start" x="1978.47" y="-138.8" font-family="Arial" font-size="13.00" fill="#cbd5e1">Civic Open Data API / OSRM</text>
<text xml:space="preserve" text-anchor="start" x="1928.34" y="-117.2" font-family="Arial" font-size="15.00" fill="#cbd5e1">Live congestion and arterial traffic speed</text>
<text xml:space="preserve" text-anchor="start" x="1955.03" y="-99.2" font-family="Arial" font-size="15.00" fill="#cbd5e1">feed for transit ETA calculations.</text>
</g>
<!-- web&#45;ui&#45;&gt;api&#45;backend -->
<g id="edge5" class="edge">
<title>web&#45;ui&#45;&gt;api&#45;backend</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M1005,-1450.85C1005,-1399.3 1005,-1334.29 1005,-1281.08"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="1007.63,-1281.13 1005,-1273.63 1002.38,-1281.13 1007.63,-1281.13"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1005,-1330.8 1005,-1390.8 1225.02,-1390.8 1225.02,-1330.8 1005,-1330.8"/>
<text xml:space="preserve" text-anchor="start" x="1008" y="-1373.8" font-family="Arial" font-size="14.00" fill="#c9c9c9">Sends match, cascade, and intake</text>
<text xml:space="preserve" text-anchor="start" x="1008" y="-1357" font-family="Arial" font-size="14.00" fill="#c9c9c9">requests</text>
<text xml:space="preserve" text-anchor="start" x="1008" y="-1336.2" font-family="Arial" font-size="12.00" fill="#c9c9c9">[ HTTPS / JSON REST ]</text>
</g>
<!-- web&#45;ui&#45;&gt;osm&#45;tiles -->
<g id="edge6" class="edge">
<title>web&#45;ui&#45;&gt;osm&#45;tiles</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M1157.56,-1450.85C1248.83,-1397.63 1364.71,-1330.07 1457.52,-1275.96"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="1458.65,-1278.33 1463.81,-1272.29 1456.01,-1273.8 1458.65,-1278.33"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1348.76,-1339.2 1348.76,-1382.4 1519.73,-1382.4 1519.73,-1339.2 1348.76,-1339.2"/>
<text xml:space="preserve" text-anchor="start" x="1351.76" y="-1365.4" font-family="Arial" font-size="14.00" fill="#c9c9c9">Fetches Chicago map tiles</text>
<text xml:space="preserve" text-anchor="start" x="1351.76" y="-1344.6" font-family="Arial" font-size="12.00" fill="#c9c9c9">[ HTTPS ]</text>
</g>
<!-- api&#45;backend&#45;&gt;agent&#45;engine -->
<g id="edge7" class="edge">
<title>api&#45;backend&#45;&gt;agent&#45;engine</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M919.25,-1091.13C901.66,-1071.73 883.66,-1050.95 867.76,-1030.8 845.18,-1002.19 822.39,-969.67 802.49,-939.78"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="804.68,-938.34 798.35,-933.54 800.3,-941.24 804.68,-938.34"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="867.76,-991.2 867.76,-1030.8 1094,-1030.8 1094,-991.2 867.76,-991.2"/>
<text xml:space="preserve" text-anchor="start" x="870.76" y="-1013.8" font-family="Arial" font-size="14.00" fill="#c9c9c9">Dispatches coordinator queries and</text>
<text xml:space="preserve" text-anchor="start" x="870.76" y="-997" font-family="Arial" font-size="14.00" fill="#c9c9c9">briefs</text>
</g>
<!-- api&#45;backend&#45;&gt;logistics&#45;tools -->
<g id="edge8" class="edge">
<title>api&#45;backend&#45;&gt;logistics&#45;tools</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M1084.6,-1090.97C1097.57,-1072.23 1109.27,-1051.75 1117,-1030.8 1176.03,-870.88 1095.13,-812.18 1141,-648 1145.77,-630.92 1152.67,-613.55 1160.42,-597"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="1162.6,-598.52 1163.49,-590.62 1157.87,-596.24 1162.6,-598.52"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1139.55,-821.4 1139.55,-861 1396.87,-861 1396.87,-821.4 1139.55,-821.4"/>
<text xml:space="preserve" text-anchor="start" x="1142.55" y="-844" font-family="Arial" font-size="14.00" fill="#c9c9c9">Executes deterministic matching, clocks,</text>
<text xml:space="preserve" text-anchor="start" x="1142.55" y="-827.2" font-family="Arial" font-size="14.00" fill="#c9c9c9">and traffic tools</text>
</g>
<!-- api&#45;backend&#45;&gt;bigquery -->
<g id="edge9" class="edge">
<title>api&#45;backend&#45;&gt;bigquery</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M837.77,-1142.3C628.39,-1085.24 279.27,-954.25 131.62,-691.2 44.62,-536.22 183.87,-347.93 290.78,-236.08"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="292.35,-238.22 295.67,-231 288.57,-234.58 292.35,-238.22"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="131.62,-648 131.62,-691.2 403,-691.2 403,-648 131.62,-648"/>
<text xml:space="preserve" text-anchor="start" x="134.62" y="-674.2" font-family="Arial" font-size="14.00" fill="#c9c9c9">Queries demographic baselines and audits</text>
<text xml:space="preserve" text-anchor="start" x="134.62" y="-653.4" font-family="Arial" font-size="12.00" fill="#c9c9c9">[ BigQuery Client SDK ]</text>
</g>
<!-- agent&#45;engine&#45;&gt;logistics&#45;tools -->
<g id="edge10" class="edge">
<title>agent&#45;engine&#45;&gt;logistics&#45;tools</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M808.99,-751.58C838.96,-716.39 876.2,-677.39 915.25,-648 955.97,-617.35 1003.99,-590.36 1049.67,-568.07"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="1050.74,-570.47 1056.35,-564.85 1048.45,-565.74 1050.74,-570.47"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="915.25,-658.2 915.25,-681 1108,-681 1108,-658.2 915.25,-658.2"/>
<text xml:space="preserve" text-anchor="start" x="918.25" y="-664" font-family="Arial" font-size="14.00" fill="#c9c9c9">Calls logistics and safety tools</text>
</g>
<!-- agent&#45;engine&#45;&gt;mcp&#45;toolbox -->
<g id="edge11" class="edge">
<title>agent&#45;engine&#45;&gt;mcp&#45;toolbox</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M580.31,-765.81C535.07,-733.9 504.22,-693.46 529.43,-648 541.92,-625.47 559.39,-605.9 579.26,-589.03"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="580.81,-591.15 584.95,-584.37 577.49,-587.09 580.81,-591.15"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="529.43,-648 529.43,-691.2 800,-691.2 800,-648 529.43,-648"/>
<text xml:space="preserve" text-anchor="start" x="532.43" y="-674.2" font-family="Arial" font-size="14.00" fill="#c9c9c9">Executes ad&#45;hoc queries via MCP protocol</text>
<text xml:space="preserve" text-anchor="start" x="532.43" y="-653.4" font-family="Arial" font-size="12.00" fill="#c9c9c9">[ MCP JSON&#45;RPC ]</text>
</g>
<!-- agent&#45;engine&#45;&gt;bigquery -->
<g id="edge13" class="edge">
<title>agent&#45;engine&#45;&gt;bigquery</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M589.62,-751.22C557.5,-731.79 523.96,-711.09 493,-691.2 464.44,-672.85 458.75,-666.05 430,-648 384.56,-619.47 352.15,-634.42 325.25,-588 262.65,-480.01 304.08,-333.98 344.86,-238.19"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="347.16,-239.5 347.73,-231.57 342.34,-237.41 347.16,-239.5"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="325.25,-478.2 325.25,-517.8 532,-517.8 532,-478.2 325.25,-478.2"/>
<text xml:space="preserve" text-anchor="start" x="328.25" y="-500.8" font-family="Arial" font-size="14.00" fill="#c9c9c9">Inserts new recipient record with</text>
<text xml:space="preserve" text-anchor="start" x="328.25" y="-484" font-family="Arial" font-size="14.00" fill="#c9c9c9">embeddings</text>
</g>
<!-- agent&#45;engine&#45;&gt;gemini -->
<g id="edge12" class="edge">
<title>agent&#45;engine&#45;&gt;gemini</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M901.7,-781.34C929.46,-771.24 958.05,-760.88 985,-751.2 1189.54,-677.69 1243.89,-667.96 1446,-588 1456.97,-583.66 1468.23,-579.08 1479.54,-574.39"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="1480.35,-576.89 1486.26,-571.58 1478.33,-572.05 1480.35,-576.89"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1279.38,-648 1279.38,-691.2 1380.06,-691.2 1380.06,-648 1279.38,-648"/>
<text xml:space="preserve" text-anchor="start" x="1282.38" y="-676.6" font-family="Arial" font-weight="bold" font-size="14.00" fill="#c9c9c9">[...]</text>
<text xml:space="preserve" text-anchor="start" x="1282.38" y="-653.4" font-family="Arial" font-size="12.00" fill="#c9c9c9">[ gRPC / HTTPS ]</text>
</g>
<!-- logistics&#45;tools&#45;&gt;bigquery -->
<g id="edge16" class="edge">
<title>logistics&#45;tools&#45;&gt;bigquery</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M1094.14,-408.16C1032.93,-367.51 956.85,-321.13 884,-288 790.17,-245.33 680.83,-210.71 589.36,-185.62"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="590.28,-183.15 582.36,-183.71 588.9,-188.21 590.28,-183.15"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="989.65,-306.6 989.65,-329.4 1016.65,-329.4 1016.65,-306.6 989.65,-306.6"/>
<text xml:space="preserve" text-anchor="start" x="992.65" y="-314.8" font-family="Arial" font-weight="bold" font-size="14.00" fill="#c9c9c9">[...]</text>
</g>
<!-- logistics&#45;tools&#45;&gt;openfda -->
<g id="edge14" class="edge">
<title>logistics&#45;tools&#45;&gt;openfda</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M1320.13,-408.05C1380.07,-355.32 1456.04,-288.5 1517.27,-234.64"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="1518.87,-236.73 1522.77,-229.81 1515.4,-232.79 1518.87,-236.73"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1446.87,-288 1446.87,-348 1667.65,-348 1667.65,-288 1446.87,-288"/>
<text xml:space="preserve" text-anchor="start" x="1449.87" y="-331" font-family="Arial" font-size="14.00" fill="#c9c9c9">Screens food description for active</text>
<text xml:space="preserve" text-anchor="start" x="1449.87" y="-314.2" font-family="Arial" font-size="14.00" fill="#c9c9c9">recalls</text>
<text xml:space="preserve" text-anchor="start" x="1449.87" y="-293.4" font-family="Arial" font-size="12.00" fill="#c9c9c9">[ HTTPS REST ]</text>
</g>
<!-- logistics&#45;tools&#45;&gt;chicago&#45;traffic -->
<g id="edge15" class="edge">
<title>logistics&#45;tools&#45;&gt;chicago&#45;traffic</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M1378.76,-427.45C1397.22,-420.43 1415.91,-413.78 1434,-408 1547.38,-371.78 1584.08,-391.18 1695,-348 1772.65,-317.77 1853.72,-273.31 1919.94,-233.16"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="1921.15,-235.5 1926.19,-229.35 1918.42,-231.01 1921.15,-235.5"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1821.31,-296.4 1821.31,-339.6 2070.88,-339.6 2070.88,-296.4 1821.31,-296.4"/>
<text xml:space="preserve" text-anchor="start" x="1824.31" y="-322.6" font-family="Arial" font-size="14.00" fill="#c9c9c9">Retrieves live street congestion speeds</text>
<text xml:space="preserve" text-anchor="start" x="1824.31" y="-301.8" font-family="Arial" font-size="12.00" fill="#c9c9c9">[ HTTPS REST ]</text>
</g>
<!-- mcp&#45;toolbox&#45;&gt;bigquery -->
<g id="edge17" class="edge">
<title>mcp&#45;toolbox&#45;&gt;bigquery</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M675.32,-408.05C620.81,-355.72 551.83,-289.53 495.95,-235.89"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="497.91,-234.14 490.68,-230.84 494.28,-237.92 497.91,-234.14"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="603.83,-296.4 603.83,-339.6 856.53,-339.6 856.53,-296.4 603.83,-296.4"/>
<text xml:space="preserve" text-anchor="start" x="606.83" y="-322.6" font-family="Arial" font-size="14.00" fill="#c9c9c9">Introspects tables and runs ad&#45;hoc SQL</text>
<text xml:space="preserve" text-anchor="start" x="606.83" y="-301.8" font-family="Arial" font-size="12.00" fill="#c9c9c9">[ BigQuery API ]</text>
</g>
<!-- donor&#45;&gt;web&#45;ui -->
<g id="edge1" class="edge">
<title>donor&#45;&gt;web&#45;ui</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M443.67,-1799.82C482.41,-1765.31 529.56,-1727.54 576.89,-1700 657.34,-1653.18 754.11,-1616.02 835.27,-1589.51"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="835.89,-1592.07 842.21,-1587.26 834.27,-1587.08 835.89,-1592.07"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="576.89,-1700 576.89,-1739.6 800,-1739.6 800,-1700 576.89,-1700"/>
<text xml:space="preserve" text-anchor="start" x="579.89" y="-1722.6" font-family="Arial" font-size="14.00" fill="#c9c9c9">Submits surplus offer with deadline</text>
<text xml:space="preserve" text-anchor="start" x="579.89" y="-1705.8" font-family="Arial" font-size="14.00" fill="#c9c9c9">clock</text>
</g>
<!-- coordinator&#45;&gt;web&#45;ui -->
<g id="edge2" class="edge">
<title>coordinator&#45;&gt;web&#45;ui</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M803.78,-1799.91C813.79,-1767.03 827.81,-1730.39 846.68,-1700 860.17,-1678.29 877.17,-1657.29 895,-1638.08"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="896.81,-1639.98 900.05,-1632.72 893,-1636.37 896.81,-1639.98"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="846.68,-1700 846.68,-1739.6 1090,-1739.6 1090,-1700 846.68,-1700"/>
<text xml:space="preserve" text-anchor="start" x="849.68" y="-1722.6" font-family="Arial" font-size="14.00" fill="#c9c9c9">Reviews match brief, inspects decoys,</text>
<text xml:space="preserve" text-anchor="start" x="849.68" y="-1705.8" font-family="Arial" font-size="14.00" fill="#c9c9c9">and triggers dispatches</text>
</g>
<!-- pantry&#45;&gt;web&#45;ui -->
<g id="edge3" class="edge">
<title>pantry&#45;&gt;web&#45;ui</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M1174.64,-1799.7C1155.61,-1768 1133.69,-1732.18 1113,-1700 1100.25,-1680.17 1086.29,-1659.2 1072.75,-1639.23"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="1075.07,-1637.98 1068.69,-1633.25 1070.73,-1640.93 1075.07,-1637.98"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1135.53,-1700 1135.53,-1739.6 1391.34,-1739.6 1391.34,-1700 1135.53,-1700"/>
<text xml:space="preserve" text-anchor="start" x="1138.53" y="-1722.6" font-family="Arial" font-size="14.00" fill="#c9c9c9">Onboards new pantry via conversational</text>
<text xml:space="preserve" text-anchor="start" x="1138.53" y="-1705.8" font-family="Arial" font-size="14.00" fill="#c9c9c9">interview</text>
</g>
<!-- driver&#45;&gt;web&#45;ui -->
<g id="edge4" class="edge">
<title>driver&#45;&gt;web&#45;ui</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M1565.53,-1799.79C1521.73,-1765.68 1469.23,-1728.2 1418,-1700 1341.4,-1657.83 1251.22,-1621.88 1174.71,-1594.95"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="1175.77,-1592.54 1167.82,-1592.54 1174.04,-1597.5 1175.77,-1592.54"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1476.97,-1700 1476.97,-1739.6 1735.1,-1739.6 1735.1,-1700 1476.97,-1700"/>
<text xml:space="preserve" text-anchor="start" x="1479.97" y="-1722.6" font-family="Arial" font-size="14.00" fill="#c9c9c9">Receives turn&#45;by&#45;turn routing and pickup</text>
<text xml:space="preserve" text-anchor="start" x="1479.97" y="-1705.8" font-family="Arial" font-size="14.00" fill="#c9c9c9">alerts</text>
</g>
</g>
</svg>
`;case`logistics`:return`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
 "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<!-- Generated by graphviz version 16.1.0 (0)
 -->
<!-- Pages: 1 -->
<svg width="1246pt" height="2569pt"
 viewBox="0.00 0.00 1246.00 2569.00" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g id="graph0" class="graph" transform="scale(1 1) rotate(0) translate(15.05 2554.05)">
<g id="clust1" class="cluster">
<title>cluster_logistics&#45;tools</title>
<polygon fill="#2225aa" stroke="#2a2490" points="8,-800 8,-2531 1207.9,-2531 1207.9,-800 8,-800"/>
<text xml:space="preserve" text-anchor="start" x="16" y="-2518.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#c7d2fe" fill-opacity="0.701961">UBER LOGISTICS TOOL SUITE</text>
</g>
<!-- clock&#45;calc -->
<g id="node1" class="node">
<title>clock&#45;calc</title>
<polygon fill="#0284c7" stroke="#0369a1" stroke-width="0" points="439.79,-2180 48,-2180 48,-2000 439.79,-2000 439.79,-2180"/>
<text xml:space="preserve" text-anchor="start" x="126.07" y="-2111.8" font-family="Arial" font-size="20.00" fill="#f0f9ff">Shelf&#45;Life Clock Calculator</text>
<text xml:space="preserve" text-anchor="start" x="223.66" y="-2090.8" font-family="Arial" font-size="13.00" fill="#b6ecf7">Python</text>
<text xml:space="preserve" text-anchor="start" x="88" y="-2069.2" font-family="Arial" font-size="15.00" fill="#b6ecf7">Calculates effective pickup window from USDA</text>
<text xml:space="preserve" text-anchor="start" x="106.31" y="-2051.2" font-family="Arial" font-size="15.00" fill="#b6ecf7">shelf&#45;life references and donor deadlines.</text>
</g>
<!-- matcher -->
<g id="node2" class="node">
<title>matcher</title>
<polygon fill="#0284c7" stroke="#0369a1" stroke-width="0" points="418.94,-1890 68.86,-1890 68.86,-1710 418.94,-1710 418.94,-1890"/>
<text xml:space="preserve" text-anchor="start" x="108.86" y="-1830.8" font-family="Arial" font-size="20.00" fill="#f0f9ff">Constraint Filter &amp; Tie&#45;Breaker</text>
<text xml:space="preserve" text-anchor="start" x="223.66" y="-1809.8" font-family="Arial" font-size="13.00" fill="#b6ecf7">Python</text>
<text xml:space="preserve" text-anchor="start" x="130.51" y="-1788.2" font-family="Arial" font-size="15.00" fill="#b6ecf7">Hard&#45;filters cold&#45;chain decoys and</text>
<text xml:space="preserve" text-anchor="start" x="130.08" y="-1770.2" font-family="Arial" font-size="15.00" fill="#b6ecf7">contradictions, then breaks ties on</text>
<text xml:space="preserve" text-anchor="start" x="124.26" y="-1752.2" font-family="Arial" font-size="15.00" fill="#b6ecf7">vehicle&#45;insecurity and poverty rates.</text>
</g>
<!-- cascading&#45;dispatcher -->
<g id="node3" class="node">
<title>cascading&#45;dispatcher</title>
<polygon fill="#0284c7" stroke="#0369a1" stroke-width="0" points="410.64,-2470 77.15,-2470 77.15,-2290 410.64,-2290 410.64,-2470"/>
<text xml:space="preserve" text-anchor="start" x="121.04" y="-2410.8" font-family="Arial" font-size="20.00" fill="#f0f9ff">Cascading Dispatch Engine</text>
<text xml:space="preserve" text-anchor="start" x="223.66" y="-2389.8" font-family="Arial" font-size="13.00" fill="#b6ecf7">Python</text>
<text xml:space="preserve" text-anchor="start" x="117.15" y="-2368.2" font-family="Arial" font-size="15.00" fill="#b6ecf7">Generates tailored dispatch alerts and</text>
<text xml:space="preserve" text-anchor="start" x="127.59" y="-2350.2" font-family="Arial" font-size="15.00" fill="#b6ecf7">instantly shifts to backup pantries if</text>
<text xml:space="preserve" text-anchor="start" x="187.21" y="-2332.2" font-family="Arial" font-size="15.00" fill="#b6ecf7">primary declines.</text>
</g>
<!-- load&#45;splitter -->
<g id="node4" class="node">
<title>load&#45;splitter</title>
<polygon fill="#0284c7" stroke="#0369a1" stroke-width="0" points="1167.9,-2470 817.75,-2470 817.75,-2290 1167.9,-2290 1167.9,-2470"/>
<text xml:space="preserve" text-anchor="start" x="864.44" y="-2410.8" font-family="Arial" font-size="20.00" fill="#f0f9ff">Multi&#45;Pantry Bulk Partitioning</text>
<text xml:space="preserve" text-anchor="start" x="972.59" y="-2389.8" font-family="Arial" font-size="13.00" fill="#b6ecf7">Python</text>
<text xml:space="preserve" text-anchor="start" x="858.6" y="-2368.2" font-family="Arial" font-size="15.00" fill="#b6ecf7">Partitions massive agricultural donations</text>
<text xml:space="preserve" text-anchor="start" x="857.75" y="-2350.2" font-family="Arial" font-size="15.00" fill="#b6ecf7">across multiple pantries when exceeding</text>
<text xml:space="preserve" text-anchor="start" x="941.55" y="-2332.2" font-family="Arial" font-size="15.00" fill="#b6ecf7">single capacity.</text>
</g>
<!-- recall&#45;checker -->
<g id="node5" class="node">
<title>recall&#45;checker</title>
<polygon fill="#0284c7" stroke="#0369a1" stroke-width="0" points="419.39,-1310 68.41,-1310 68.41,-1130 419.39,-1130 419.39,-1310"/>
<text xml:space="preserve" text-anchor="start" x="115.5" y="-1241.8" font-family="Arial" font-size="20.00" fill="#f0f9ff">Food Safety Recall Guardrail</text>
<text xml:space="preserve" text-anchor="start" x="223.66" y="-1220.8" font-family="Arial" font-size="13.00" fill="#b6ecf7">Python</text>
<text xml:space="preserve" text-anchor="start" x="108.41" y="-1199.2" font-family="Arial" font-size="15.00" fill="#b6ecf7">Queries openFDA to halt or flag postings</text>
<text xml:space="preserve" text-anchor="start" x="125.5" y="-1181.2" font-family="Arial" font-size="15.00" fill="#b6ecf7">subject to active food recall notices.</text>
</g>
<!-- traffic&#45;router -->
<g id="node6" class="node">
<title>traffic&#45;router</title>
<polygon fill="#0284c7" stroke="#0369a1" stroke-width="0" points="422.85,-1020 64.95,-1020 64.95,-840 422.85,-840 422.85,-1020"/>
<text xml:space="preserve" text-anchor="start" x="104.95" y="-951.8" font-family="Arial" font-size="20.00" fill="#f0f9ff">Chicago Traffic &amp; Route Router</text>
<text xml:space="preserve" text-anchor="start" x="223.66" y="-930.8" font-family="Arial" font-size="13.00" fill="#b6ecf7">Python</text>
<text xml:space="preserve" text-anchor="start" x="123.01" y="-909.2" font-family="Arial" font-size="15.00" fill="#b6ecf7">Computes real&#45;time driving duration,</text>
<text xml:space="preserve" text-anchor="start" x="117.99" y="-891.2" font-family="Arial" font-size="15.00" fill="#b6ecf7">congestion delay, and safety margins.</text>
</g>
<!-- equity&#45;auditor -->
<g id="node7" class="node">
<title>equity&#45;auditor</title>
<polygon fill="#0284c7" stroke="#0369a1" stroke-width="0" points="423.56,-1600 64.23,-1600 64.23,-1420 423.56,-1420 423.56,-1600"/>
<text xml:space="preserve" text-anchor="start" x="148.29" y="-1540.8" font-family="Arial" font-size="20.00" fill="#f0f9ff">Spatial Equity Auditor</text>
<text xml:space="preserve" text-anchor="start" x="223.66" y="-1519.8" font-family="Arial" font-size="13.00" fill="#b6ecf7">Python</text>
<text xml:space="preserve" text-anchor="start" x="108.42" y="-1498.2" font-family="Arial" font-size="15.00" fill="#b6ecf7">Measures demographic lift against metro</text>
<text xml:space="preserve" text-anchor="start" x="104.23" y="-1480.2" font-family="Arial" font-size="15.00" fill="#b6ecf7">baselines and uncovers cold&#45;chain rescue</text>
<text xml:space="preserve" text-anchor="start" x="217.22" y="-1462.2" font-family="Arial" font-size="15.00" fill="#b6ecf7">deserts.</text>
</g>
<!-- bigquery -->
<g id="node8" class="node">
<title>bigquery</title>
<path fill="#3b82f6" stroke="#2563eb" stroke-width="2" d="M1176.29,-743.64C1176.29,-752.67 1094.06,-760 992.83,-760 891.59,-760 809.36,-752.67 809.36,-743.64 809.36,-743.64 809.36,-596.36 809.36,-596.36 809.36,-587.33 891.59,-580 992.83,-580 1094.06,-580 1176.29,-587.33 1176.29,-596.36 1176.29,-596.36 1176.29,-743.64 1176.29,-743.64"/>
<path fill="none" stroke="#2563eb" stroke-width="2" d="M1176.29,-743.64C1176.29,-734.61 1094.06,-727.27 992.83,-727.27 891.59,-727.27 809.36,-734.61 809.36,-743.64"/>
<text xml:space="preserve" text-anchor="start" x="829.42" y="-700.8" font-family="Arial" font-size="20.00" fill="#eff6ff">BigQuery Warehouse &amp; Vector Store</text>
<text xml:space="preserve" text-anchor="start" x="869.97" y="-679.8" font-family="Arial" font-size="13.00" fill="#bfdbfe">Google Cloud BigQuery (a4i_food dataset)</text>
<text xml:space="preserve" text-anchor="start" x="866.93" y="-658.2" font-family="Arial" font-size="15.00" fill="#bfdbfe">Analytical warehouse storing recipient</text>
<text xml:space="preserve" text-anchor="start" x="848.6" y="-640.2" font-family="Arial" font-size="15.00" fill="#bfdbfe">profiles, census tracts, USDA shelf&#45;life, and</text>
<text xml:space="preserve" text-anchor="start" x="927.37" y="-622.2" font-family="Arial" font-size="15.00" fill="#bfdbfe">vector embeddings.</text>
</g>
<!-- openfda -->
<g id="node9" class="node">
<title>openfda</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1159.63,-470 826.02,-470 826.02,-290 1159.63,-290 1159.63,-470"/>
<text xml:space="preserve" text-anchor="start" x="874.99" y="-410.8" font-family="Arial" font-size="20.00" fill="#f8fafc">openFDA Food Safety API</text>
<text xml:space="preserve" text-anchor="start" x="927.8" y="-389.8" font-family="Arial" font-size="13.00" fill="#cbd5e1">REST API, api.fda.gov</text>
<text xml:space="preserve" text-anchor="start" x="846.08" y="-368.2" font-family="Arial" font-size="15.00" fill="#cbd5e1">Federal enforcement feed screening surplus</text>
<text xml:space="preserve" text-anchor="start" x="868.17" y="-350.2" font-family="Arial" font-size="15.00" fill="#cbd5e1">food for active recalls and undeclared</text>
<text xml:space="preserve" text-anchor="start" x="960.31" y="-332.2" font-family="Arial" font-size="15.00" fill="#cbd5e1">allergens.</text>
</g>
<!-- chicago&#45;traffic -->
<g id="node10" class="node">
<title>chicago&#45;traffic</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1152.85,-180 832.81,-180 832.81,0 1152.85,0 1152.85,-180"/>
<text xml:space="preserve" text-anchor="start" x="857.79" y="-111.8" font-family="Arial" font-size="20.00" fill="#f8fafc">City of Chicago Traffic Tracker</text>
<text xml:space="preserve" text-anchor="start" x="908.3" y="-90.8" font-family="Arial" font-size="13.00" fill="#cbd5e1">Civic Open Data API / OSRM</text>
<text xml:space="preserve" text-anchor="start" x="858.16" y="-69.2" font-family="Arial" font-size="15.00" fill="#cbd5e1">Live congestion and arterial traffic speed</text>
<text xml:space="preserve" text-anchor="start" x="884.86" y="-51.2" font-family="Arial" font-size="15.00" fill="#cbd5e1">feed for transit ETA calculations.</text>
</g>
<!-- clock&#45;calc&#45;&gt;bigquery -->
<g id="edge1" class="edge">
<title>clock&#45;calc&#45;&gt;bigquery</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M400.47,-2000.09C520.24,-1921.18 677.13,-1794.39 749.36,-1636 829.13,-1461.09 706.73,-935.55 809.36,-773 811.59,-769.47 813.99,-766.04 816.54,-762.73"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="818.48,-764.5 821.23,-757.04 814.43,-761.16 818.48,-764.5"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="522.36,-1925.31 522.36,-1948.11 726.79,-1948.11 726.79,-1925.31 522.36,-1925.31"/>
<text xml:space="preserve" text-anchor="start" x="525.36" y="-1931.11" font-family="Arial" font-size="14.00" fill="#c9c9c9">Reads shelf&#45;life reference hours</text>
</g>
<!-- matcher&#45;&gt;bigquery -->
<g id="edge2" class="edge">
<title>matcher&#45;&gt;bigquery</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M378.75,-1710.09C400.24,-1692.99 421.43,-1674.35 439.79,-1655 610.7,-1474.91 660.71,-1421.91 749.36,-1190 816.22,-1015.1 703.65,-927.55 809.36,-773 811.85,-769.37 814.5,-765.85 817.31,-762.44"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="819.14,-764.33 822.12,-756.97 815.2,-760.87 819.14,-764.33"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="611.08,-1586 611.08,-1608.8 638.07,-1608.8 638.07,-1586 611.08,-1586"/>
<text xml:space="preserve" text-anchor="start" x="614.08" y="-1594.2" font-family="Arial" font-weight="bold" font-size="14.00" fill="#c9c9c9">[...]</text>
</g>
<!-- cascading&#45;dispatcher&#45;&gt;load&#45;splitter -->
<!-- recall&#45;checker&#45;&gt;openfda -->
<g id="edge4" class="edge">
<title>recall&#45;checker&#45;&gt;openfda</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M392.83,-1130.09C410.9,-1113.73 427.35,-1095.32 439.79,-1075 523.14,-938.92 414.17,-855.66 499.79,-721 575.25,-602.32 708.42,-513.82 817.2,-456.77"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="818.18,-459.21 823.63,-453.42 815.76,-454.55 818.18,-459.21"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="514.19,-721 514.19,-781 734.97,-781 734.97,-721 514.19,-721"/>
<text xml:space="preserve" text-anchor="start" x="517.19" y="-764" font-family="Arial" font-size="14.00" fill="#c9c9c9">Screens food description for active</text>
<text xml:space="preserve" text-anchor="start" x="517.19" y="-747.2" font-family="Arial" font-size="14.00" fill="#c9c9c9">recalls</text>
<text xml:space="preserve" text-anchor="start" x="517.19" y="-726.4" font-family="Arial" font-size="12.00" fill="#c9c9c9">[ HTTPS REST ]</text>
</g>
<!-- traffic&#45;router&#45;&gt;chicago&#45;traffic -->
<g id="edge5" class="edge">
<title>traffic&#45;router&#45;&gt;chicago&#45;traffic</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M274.47,-840.44C313.29,-732.9 389.68,-551.34 499.79,-425.8 590.74,-322.11 720.46,-235.32 823.88,-175.97"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="825.01,-178.34 830.22,-172.35 822.4,-173.78 825.01,-178.34"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="499.79,-425.8 499.79,-469 749.36,-469 749.36,-425.8 499.79,-425.8"/>
<text xml:space="preserve" text-anchor="start" x="502.79" y="-452" font-family="Arial" font-size="14.00" fill="#c9c9c9">Retrieves live street congestion speeds</text>
<text xml:space="preserve" text-anchor="start" x="502.79" y="-431.2" font-family="Arial" font-size="12.00" fill="#c9c9c9">[ HTTPS REST ]</text>
</g>
<!-- equity&#45;auditor&#45;&gt;bigquery -->
<g id="edge6" class="edge">
<title>equity&#45;auditor&#45;&gt;bigquery</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M389.59,-1420.23C408.48,-1403.71 426.02,-1385.21 439.79,-1365 497.06,-1280.97 452.81,-1234.39 499.79,-1144.2 599.03,-953.68 644.34,-910.53 809.36,-773 814.02,-769.12 818.84,-765.31 823.79,-761.58"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="825.3,-763.72 829.78,-757.16 822.19,-759.49 825.3,-763.72"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="513.4,-1144.2 513.4,-1167 735.76,-1167 735.76,-1144.2 513.4,-1144.2"/>
<text xml:space="preserve" text-anchor="start" x="516.4" y="-1150" font-family="Arial" font-size="14.00" fill="#c9c9c9">Audits spatial distribution and gaps</text>
</g>
</g>
</svg>
`;case`data-layer`:return`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
 "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<!-- Generated by graphviz version 16.1.0 (0)
 -->
<!-- Pages: 1 -->
<svg width="2418pt" height="607pt"
 viewBox="0.00 0.00 2418.00 607.00" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g id="graph0" class="graph" transform="scale(1 1) rotate(0) translate(15.05 591.85)">
<g id="clust1" class="cluster">
<title>cluster_bigquery</title>
<polygon fill="#194b9e" stroke="#1b3d88" points="8,-8 8,-289.2 2380,-289.2 2380,-8 8,-8"/>
<text xml:space="preserve" text-anchor="start" x="16" y="-276.3" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">BIGQUERY WAREHOUSE &amp; VECTOR STORE</text>
</g>
<!-- recipients&#45;data -->
<g id="node1" class="node">
<title>recipients&#45;data</title>
<polygon fill="#0284c7" stroke="#0369a1" stroke-width="0" points="408.08,-228 47.92,-228 47.92,-48 408.08,-48 408.08,-228"/>
<text xml:space="preserve" text-anchor="start" x="94.6" y="-168.8" font-family="Arial" font-size="20.00" fill="#f0f9ff">Recipients &amp; Capacities Table</text>
<text xml:space="preserve" text-anchor="start" x="182.84" y="-147.8" font-family="Arial" font-size="13.00" fill="#b6ecf7">BigQuery Table</text>
<text xml:space="preserve" text-anchor="start" x="89.18" y="-126.2" font-family="Arial" font-size="15.00" fill="#b6ecf7">Stores organizations, walk&#45;in cold storage</text>
<text xml:space="preserve" text-anchor="start" x="87.92" y="-108.2" font-family="Arial" font-size="15.00" fill="#b6ecf7">capacity, pickup windows, and embedding</text>
<text xml:space="preserve" text-anchor="start" x="201.74" y="-90.2" font-family="Arial" font-size="15.00" fill="#b6ecf7">vectors.</text>
</g>
<!-- shelf&#45;life&#45;data -->
<g id="node2" class="node">
<title>shelf&#45;life&#45;data</title>
<polygon fill="#0284c7" stroke="#0369a1" stroke-width="0" points="895.44,-228 518.56,-228 518.56,-48 895.44,-48 895.44,-228"/>
<text xml:space="preserve" text-anchor="start" x="596.95" y="-159.8" font-family="Arial" font-size="20.00" fill="#f0f9ff">USDA Shelf&#45;Life Catalog</text>
<text xml:space="preserve" text-anchor="start" x="661.84" y="-138.8" font-family="Arial" font-size="13.00" fill="#b6ecf7">BigQuery Table</text>
<text xml:space="preserve" text-anchor="start" x="558.56" y="-117.2" font-family="Arial" font-size="15.00" fill="#b6ecf7">Standard perishable and pantry food storage</text>
<text xml:space="preserve" text-anchor="start" x="579.43" y="-99.2" font-family="Arial" font-size="15.00" fill="#b6ecf7">guidelines and maximum viable hours.</text>
</g>
<!-- tract&#45;demographics -->
<g id="node3" class="node">
<title>tract&#45;demographics</title>
<polygon fill="#0284c7" stroke="#0369a1" stroke-width="0" points="1348.72,-228 1005.28,-228 1005.28,-48 1348.72,-48 1348.72,-228"/>
<text xml:space="preserve" text-anchor="start" x="1050.29" y="-168.8" font-family="Arial" font-size="20.00" fill="#f0f9ff">Census Tract Demographics</text>
<text xml:space="preserve" text-anchor="start" x="1075.47" y="-147.8" font-family="Arial" font-size="13.00" fill="#b6ecf7">BigQuery Table &amp; Spatial Polygons</text>
<text xml:space="preserve" text-anchor="start" x="1045.28" y="-126.2" font-family="Arial" font-size="15.00" fill="#b6ecf7">Cook County tract demographic metrics</text>
<text xml:space="preserve" text-anchor="start" x="1048.6" y="-108.2" font-family="Arial" font-size="15.00" fill="#b6ecf7">(poverty rate, zero&#45;vehicle percentage,</text>
<text xml:space="preserve" text-anchor="start" x="1115.3" y="-90.2" font-family="Arial" font-size="15.00" fill="#b6ecf7">internal centroids).</text>
</g>
<!-- vector&#45;index -->
<g id="node4" class="node">
<title>vector&#45;index</title>
<polygon fill="#0284c7" stroke="#0369a1" stroke-width="0" points="1849.51,-228 1458.49,-228 1458.49,-48 1849.51,-48 1849.51,-228"/>
<text xml:space="preserve" text-anchor="start" x="1512.26" y="-168.8" font-family="Arial" font-size="20.00" fill="#f0f9ff">BigQuery Vector Search Engine</text>
<text xml:space="preserve" text-anchor="start" x="1533.34" y="-147.8" font-family="Arial" font-size="13.00" fill="#b6ecf7">VECTOR_SEARCH, gemini&#45;embedding&#45;2</text>
<text xml:space="preserve" text-anchor="start" x="1508.09" y="-126.2" font-family="Arial" font-size="15.00" fill="#b6ecf7">Cosine distance semantic search identifying</text>
<text xml:space="preserve" text-anchor="start" x="1498.49" y="-108.2" font-family="Arial" font-size="15.00" fill="#b6ecf7">matching pantries from donor natural language</text>
<text xml:space="preserve" text-anchor="start" x="1623.98" y="-90.2" font-family="Arial" font-size="15.00" fill="#b6ecf7">postings.</text>
</g>
<!-- rescue&#45;deserts -->
<g id="node5" class="node">
<title>rescue&#45;deserts</title>
<polygon fill="#0284c7" stroke="#0369a1" stroke-width="0" points="2340.08,-228 1959.92,-228 1959.92,-48 2340.08,-48 2340.08,-228"/>
<text xml:space="preserve" text-anchor="start" x="2021.05" y="-168.8" font-family="Arial" font-size="20.00" fill="#f0f9ff">Rescue Deserts Spatial View</text>
<text xml:space="preserve" text-anchor="start" x="2107.01" y="-147.8" font-family="Arial" font-size="13.00" fill="#b6ecf7">BigQuery View</text>
<text xml:space="preserve" text-anchor="start" x="1999.92" y="-126.2" font-family="Arial" font-size="15.00" fill="#b6ecf7">Identifies tracts with &gt;30% poverty and &gt;40%</text>
<text xml:space="preserve" text-anchor="start" x="2023.26" y="-108.2" font-family="Arial" font-size="15.00" fill="#b6ecf7">no&#45;vehicle rates having 0 cold&#45;storage</text>
<text xml:space="preserve" text-anchor="start" x="2083.72" y="-90.2" font-family="Arial" font-size="15.00" fill="#b6ecf7">pantries within 5km.</text>
</g>
<!-- agent&#45;engine -->
<g id="node6" class="node">
<title>agent&#45;engine</title>
<polygon fill="#6366f1" stroke="#4f46e5" stroke-width="0" points="379.97,-576.8 58.03,-576.8 58.03,-396.8 379.97,-396.8 379.97,-576.8"/>
<text xml:space="preserve" text-anchor="start" x="85.02" y="-517.6" font-family="Arial" font-size="20.00" fill="#eef2ff">ADK Agent Reasoning Engine</text>
<text xml:space="preserve" text-anchor="start" x="159.02" y="-496.6" font-family="Arial" font-size="13.00" fill="#c7d2fe">Google ADK, Python</text>
<text xml:space="preserve" text-anchor="start" x="78.09" y="-475" font-family="Arial" font-size="15.00" fill="#c7d2fe">Autonomous reasoning layer orchestrating</text>
<text xml:space="preserve" text-anchor="start" x="102.27" y="-457" font-family="Arial" font-size="15.00" fill="#c7d2fe">multi&#45;step coordinator inquiries and</text>
<text xml:space="preserve" text-anchor="start" x="179.38" y="-439" font-family="Arial" font-size="15.00" fill="#c7d2fe">onboarding.</text>
</g>
<!-- logistics&#45;tools -->
<g id="node7" class="node">
<title>logistics&#45;tools</title>
<polygon fill="#6366f1" stroke="#4f46e5" stroke-width="0" points="1346.02,-576.8 1025.98,-576.8 1025.98,-396.8 1346.02,-396.8 1346.02,-576.8"/>
<text xml:space="preserve" text-anchor="start" x="1074.84" y="-517.6" font-family="Arial" font-size="20.00" fill="#eef2ff">Uber Logistics Tool Suite</text>
<text xml:space="preserve" text-anchor="start" x="1151.31" y="-496.6" font-family="Arial" font-size="13.00" fill="#c7d2fe">Python 3.11</text>
<text xml:space="preserve" text-anchor="start" x="1049.27" y="-475" font-family="Arial" font-size="15.00" fill="#c7d2fe">Deterministic domain tools enforcing cold</text>
<text xml:space="preserve" text-anchor="start" x="1047.6" y="-457" font-family="Arial" font-size="15.00" fill="#c7d2fe">chain physics, safety margins, and spatial</text>
<text xml:space="preserve" text-anchor="start" x="1163.9" y="-439" font-family="Arial" font-size="15.00" fill="#c7d2fe">equity.</text>
</g>
<!-- agent&#45;engine&#45;&gt;recipients&#45;data -->
<g id="edge1" class="edge">
<title>agent&#45;engine&#45;&gt;recipients&#45;data</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M203.89,-397C201.12,-377.24 198.67,-356.36 197.25,-336.8 194.9,-304.43 198.36,-269.35 203.7,-237.85"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="206.23,-238.58 204.96,-230.74 201.06,-237.66 206.23,-238.58"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="197.25,-297.2 197.25,-336.8 404,-336.8 404,-297.2 197.25,-297.2"/>
<text xml:space="preserve" text-anchor="start" x="200.25" y="-319.8" font-family="Arial" font-size="14.00" fill="#c9c9c9">Inserts new recipient record with</text>
<text xml:space="preserve" text-anchor="start" x="200.25" y="-303" font-family="Arial" font-size="14.00" fill="#c9c9c9">embeddings</text>
</g>
<!-- logistics&#45;tools&#45;&gt;recipients&#45;data -->
<g id="edge2" class="edge">
<title>logistics&#45;tools&#45;&gt;recipients&#45;data</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M1026.05,-456.68C876.55,-426.14 649.2,-371.09 464,-289.2 429.24,-273.83 393.68,-253.82 361.05,-233.45"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="362.68,-231.37 354.94,-229.59 359.88,-235.81 362.68,-231.37"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="577.49,-305.6 577.49,-328.4 788.91,-328.4 788.91,-305.6 577.49,-305.6"/>
<text xml:space="preserve" text-anchor="start" x="580.49" y="-311.4" font-family="Arial" font-size="14.00" fill="#c9c9c9">Filters by cold storage &amp; capacity</text>
</g>
<!-- logistics&#45;tools&#45;&gt;shelf&#45;life&#45;data -->
<g id="edge3" class="edge">
<title>logistics&#45;tools&#45;&gt;shelf&#45;life&#45;data</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M1038.8,-396.93C1008.83,-377.75 977.83,-357.12 949.57,-336.8 905.41,-305.06 858.71,-267.91 818.2,-234.43"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="819.96,-232.48 812.51,-229.71 816.61,-236.52 819.96,-232.48"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="949.57,-305.6 949.57,-328.4 1154,-328.4 1154,-305.6 949.57,-305.6"/>
<text xml:space="preserve" text-anchor="start" x="952.57" y="-311.4" font-family="Arial" font-size="14.00" fill="#c9c9c9">Reads shelf&#45;life reference hours</text>
</g>
<!-- logistics&#45;tools&#45;&gt;tract&#45;demographics -->
<g id="edge4" class="edge">
<title>logistics&#45;tools&#45;&gt;tract&#45;demographics</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M1183.69,-396.94C1182.44,-348.51 1180.88,-288.43 1179.58,-238.44"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="1182.21,-238.38 1179.39,-230.96 1176.96,-238.52 1182.21,-238.38"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1182.04,-305.6 1182.04,-328.4 1415.24,-328.4 1415.24,-305.6 1182.04,-305.6"/>
<text xml:space="preserve" text-anchor="start" x="1185.04" y="-311.4" font-family="Arial" font-size="14.00" fill="#c9c9c9">Enriches with poverty &amp; vehicle stats</text>
</g>
<!-- logistics&#45;tools&#45;&gt;vector&#45;index -->
<g id="edge5" class="edge">
<title>logistics&#45;tools&#45;&gt;vector&#45;index</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M1345.9,-400.15C1378.56,-380.62 1412.07,-359.03 1442,-336.8 1482.93,-306.39 1524.66,-269.08 1560.15,-235.09"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="1561.87,-237.08 1565.45,-229.99 1558.23,-233.3 1561.87,-237.08"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1491.58,-305.6 1491.58,-328.4 1789.37,-328.4 1789.37,-305.6 1491.58,-305.6"/>
<text xml:space="preserve" text-anchor="start" x="1494.58" y="-311.4" font-family="Arial" font-size="14.00" fill="#c9c9c9">Runs VECTOR_SEARCH on donor description</text>
</g>
<!-- logistics&#45;tools&#45;&gt;rescue&#45;deserts -->
<g id="edge6" class="edge">
<title>logistics&#45;tools&#45;&gt;rescue&#45;deserts</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M1346.02,-459.8C1475.42,-435.99 1660.95,-395.46 1816,-336.8 1857.96,-320.93 1866.08,-311.51 1905,-289.2 1935.76,-271.57 1968.32,-252.15 1999.32,-233.29"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="2000.39,-235.71 2005.43,-229.57 1997.66,-231.23 2000.39,-235.71"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1890.29,-305.6 1890.29,-328.4 2112.65,-328.4 2112.65,-305.6 1890.29,-305.6"/>
<text xml:space="preserve" text-anchor="start" x="1893.29" y="-311.4" font-family="Arial" font-size="14.00" fill="#c9c9c9">Audits spatial distribution and gaps</text>
</g>
</g>
</svg>
`;case`spinach-rescue-flow`:return`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
 "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<!-- Generated by graphviz version 16.1.0 (0)
 -->
<!-- Pages: 1 -->
<svg width="3439pt" height="1950pt"
 viewBox="0.00 0.00 3439.00 1950.00" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g id="graph0" class="graph" transform="scale(1 1) rotate(0) translate(15.05 1935.05)">
<!-- donor -->
<g id="node1" class="node">
<title>donor</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="320.04,-1017 0,-1017 0,-837 320.04,-837 320.04,-1017"/>
<text xml:space="preserve" text-anchor="start" x="107.21" y="-939" font-family="Arial" font-size="20.00" fill="#f8fafc">Food Donor</text>
<text xml:space="preserve" text-anchor="start" x="20.38" y="-916" font-family="Arial" font-size="15.00" fill="#cbd5e1">Grocers, restaurants, and farmers offering</text>
<text xml:space="preserve" text-anchor="start" x="32.87" y="-898" font-family="Arial" font-size="15.00" fill="#cbd5e1">surplus food on tight expiration clocks.</text>
</g>
<!-- coordinator -->
<g id="node2" class="node">
<title>coordinator</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="320.04,-727 0,-727 0,-547 320.04,-547 320.04,-727"/>
<text xml:space="preserve" text-anchor="start" x="71.08" y="-658" font-family="Arial" font-size="20.00" fill="#f8fafc">Rescue Coordinator</text>
<text xml:space="preserve" text-anchor="start" x="30.37" y="-635" font-family="Arial" font-size="15.00" fill="#cbd5e1">Dispatchers overseeing food matching,</text>
<text xml:space="preserve" text-anchor="start" x="27.86" y="-617" font-family="Arial" font-size="15.00" fill="#cbd5e1">resolving declines, and reviewing equity</text>
<text xml:space="preserve" text-anchor="start" x="139.6" y="-599" font-family="Arial" font-size="15.00" fill="#cbd5e1">briefs.</text>
</g>
<!-- web&#45;ui -->
<g id="node3" class="node">
<title>web&#45;ui</title>
<polygon fill="#6366f1" stroke="#4f46e5" stroke-width="0" points="1052.18,-872 731.94,-872 731.94,-692 1052.18,-692 1052.18,-872"/>
<text xml:space="preserve" text-anchor="start" x="756.44" y="-812.8" font-family="Arial" font-size="20.00" fill="#eef2ff">RescueDispatch Web Console</text>
<text xml:space="preserve" text-anchor="start" x="820.53" y="-791.8" font-family="Arial" font-size="13.00" fill="#c7d2fe">HTML5, Leaflet.js, CSS3</text>
<text xml:space="preserve" text-anchor="start" x="774.92" y="-770.2" font-family="Arial" font-size="15.00" fill="#c7d2fe">Interactive console featuring 1&#45;click</text>
<text xml:space="preserve" text-anchor="start" x="752" y="-752.2" font-family="Arial" font-size="15.00" fill="#c7d2fe">scenarios, live Chicago map, 7&#45;part match</text>
<text xml:space="preserve" text-anchor="start" x="762.42" y="-734.2" font-family="Arial" font-size="15.00" fill="#c7d2fe">briefs, and smartphone SMS simulator.</text>
</g>
<!-- api&#45;backend -->
<g id="node4" class="node">
<title>api&#45;backend</title>
<polygon fill="#6366f1" stroke="#4f46e5" stroke-width="0" points="1813.92,-872 1478.66,-872 1478.66,-692 1813.92,-692 1813.92,-872"/>
<text xml:space="preserve" text-anchor="start" x="1532.92" y="-812.8" font-family="Arial" font-size="20.00" fill="#eef2ff">FastAPI Dispatch Service</text>
<text xml:space="preserve" text-anchor="start" x="1559.23" y="-791.8" font-family="Arial" font-size="13.00" fill="#c7d2fe">Python 3.11, FastAPI, Uvicorn</text>
<text xml:space="preserve" text-anchor="start" x="1498.72" y="-770.2" font-family="Arial" font-size="15.00" fill="#c7d2fe">REST API handling match requests, fallback</text>
<text xml:space="preserve" text-anchor="start" x="1513.3" y="-752.2" font-family="Arial" font-size="15.00" fill="#c7d2fe">cascading, live equity audits, and pantry</text>
<text xml:space="preserve" text-anchor="start" x="1606.68" y="-734.2" font-family="Arial" font-size="15.00" fill="#c7d2fe">onboarding.</text>
</g>
<!-- clock&#45;calc -->
<g id="node5" class="node">
<title>clock&#45;calc</title>
<polygon fill="#0284c7" stroke="#0369a1" stroke-width="0" points="2601.27,-1864 2209.48,-1864 2209.48,-1684 2601.27,-1684 2601.27,-1864"/>
<text xml:space="preserve" text-anchor="start" x="2287.55" y="-1795.8" font-family="Arial" font-size="20.00" fill="#f0f9ff">Shelf&#45;Life Clock Calculator</text>
<text xml:space="preserve" text-anchor="start" x="2385.14" y="-1774.8" font-family="Arial" font-size="13.00" fill="#b6ecf7">Python</text>
<text xml:space="preserve" text-anchor="start" x="2249.48" y="-1753.2" font-family="Arial" font-size="15.00" fill="#b6ecf7">Calculates effective pickup window from USDA</text>
<text xml:space="preserve" text-anchor="start" x="2267.79" y="-1735.2" font-family="Arial" font-size="15.00" fill="#b6ecf7">shelf&#45;life references and donor deadlines.</text>
</g>
<!-- shelf&#45;life&#45;data -->
<g id="node6" class="node">
<title>shelf&#45;life&#45;data</title>
<polygon fill="#0284c7" stroke="#0369a1" stroke-width="0" points="3401.76,-1920 3024.89,-1920 3024.89,-1740 3401.76,-1740 3401.76,-1920"/>
<text xml:space="preserve" text-anchor="start" x="3103.27" y="-1851.8" font-family="Arial" font-size="20.00" fill="#f0f9ff">USDA Shelf&#45;Life Catalog</text>
<text xml:space="preserve" text-anchor="start" x="3168.17" y="-1830.8" font-family="Arial" font-size="13.00" fill="#b6ecf7">BigQuery Table</text>
<text xml:space="preserve" text-anchor="start" x="3064.89" y="-1809.2" font-family="Arial" font-size="15.00" fill="#b6ecf7">Standard perishable and pantry food storage</text>
<text xml:space="preserve" text-anchor="start" x="3085.76" y="-1791.2" font-family="Arial" font-size="15.00" fill="#b6ecf7">guidelines and maximum viable hours.</text>
</g>
<!-- recall&#45;checker -->
<g id="node7" class="node">
<title>recall&#45;checker</title>
<polygon fill="#0284c7" stroke="#0369a1" stroke-width="0" points="2580.87,-1517 2229.88,-1517 2229.88,-1337 2580.87,-1337 2580.87,-1517"/>
<text xml:space="preserve" text-anchor="start" x="2276.98" y="-1448.8" font-family="Arial" font-size="20.00" fill="#f0f9ff">Food Safety Recall Guardrail</text>
<text xml:space="preserve" text-anchor="start" x="2385.14" y="-1427.8" font-family="Arial" font-size="13.00" fill="#b6ecf7">Python</text>
<text xml:space="preserve" text-anchor="start" x="2269.88" y="-1406.2" font-family="Arial" font-size="15.00" fill="#b6ecf7">Queries openFDA to halt or flag postings</text>
<text xml:space="preserve" text-anchor="start" x="2286.98" y="-1388.2" font-family="Arial" font-size="15.00" fill="#b6ecf7">subject to active food recall notices.</text>
</g>
<!-- openfda -->
<g id="node8" class="node">
<title>openfda</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="3380.13,-1630 3046.52,-1630 3046.52,-1450 3380.13,-1450 3380.13,-1630"/>
<text xml:space="preserve" text-anchor="start" x="3095.48" y="-1570.8" font-family="Arial" font-size="20.00" fill="#f8fafc">openFDA Food Safety API</text>
<text xml:space="preserve" text-anchor="start" x="3148.29" y="-1549.8" font-family="Arial" font-size="13.00" fill="#cbd5e1">REST API, api.fda.gov</text>
<text xml:space="preserve" text-anchor="start" x="3066.58" y="-1528.2" font-family="Arial" font-size="15.00" fill="#cbd5e1">Federal enforcement feed screening surplus</text>
<text xml:space="preserve" text-anchor="start" x="3088.67" y="-1510.2" font-family="Arial" font-size="15.00" fill="#cbd5e1">food for active recalls and undeclared</text>
<text xml:space="preserve" text-anchor="start" x="3180.81" y="-1492.2" font-family="Arial" font-size="15.00" fill="#cbd5e1">allergens.</text>
</g>
<!-- matcher -->
<g id="node9" class="node">
<title>matcher</title>
<polygon fill="#0284c7" stroke="#0369a1" stroke-width="0" points="2580.41,-1050 2230.34,-1050 2230.34,-870 2580.41,-870 2580.41,-1050"/>
<text xml:space="preserve" text-anchor="start" x="2270.34" y="-990.8" font-family="Arial" font-size="20.00" fill="#f0f9ff">Constraint Filter &amp; Tie&#45;Breaker</text>
<text xml:space="preserve" text-anchor="start" x="2385.14" y="-969.8" font-family="Arial" font-size="13.00" fill="#b6ecf7">Python</text>
<text xml:space="preserve" text-anchor="start" x="2291.99" y="-948.2" font-family="Arial" font-size="15.00" fill="#b6ecf7">Hard&#45;filters cold&#45;chain decoys and</text>
<text xml:space="preserve" text-anchor="start" x="2291.56" y="-930.2" font-family="Arial" font-size="15.00" fill="#b6ecf7">contradictions, then breaks ties on</text>
<text xml:space="preserve" text-anchor="start" x="2285.74" y="-912.2" font-family="Arial" font-size="15.00" fill="#b6ecf7">vehicle&#45;insecurity and poverty rates.</text>
</g>
<!-- vector&#45;index -->
<g id="node10" class="node">
<title>vector&#45;index</title>
<polygon fill="#0284c7" stroke="#0369a1" stroke-width="0" points="3408.84,-1340 3017.81,-1340 3017.81,-1160 3408.84,-1160 3408.84,-1340"/>
<text xml:space="preserve" text-anchor="start" x="3071.58" y="-1280.8" font-family="Arial" font-size="20.00" fill="#f0f9ff">BigQuery Vector Search Engine</text>
<text xml:space="preserve" text-anchor="start" x="3092.67" y="-1259.8" font-family="Arial" font-size="13.00" fill="#b6ecf7">VECTOR_SEARCH, gemini&#45;embedding&#45;2</text>
<text xml:space="preserve" text-anchor="start" x="3067.42" y="-1238.2" font-family="Arial" font-size="15.00" fill="#b6ecf7">Cosine distance semantic search identifying</text>
<text xml:space="preserve" text-anchor="start" x="3057.81" y="-1220.2" font-family="Arial" font-size="15.00" fill="#b6ecf7">matching pantries from donor natural language</text>
<text xml:space="preserve" text-anchor="start" x="3183.31" y="-1202.2" font-family="Arial" font-size="15.00" fill="#b6ecf7">postings.</text>
</g>
<!-- recipients&#45;data -->
<g id="node11" class="node">
<title>recipients&#45;data</title>
<polygon fill="#0284c7" stroke="#0369a1" stroke-width="0" points="3393.41,-1050 3033.24,-1050 3033.24,-870 3393.41,-870 3393.41,-1050"/>
<text xml:space="preserve" text-anchor="start" x="3079.93" y="-990.8" font-family="Arial" font-size="20.00" fill="#f0f9ff">Recipients &amp; Capacities Table</text>
<text xml:space="preserve" text-anchor="start" x="3168.17" y="-969.8" font-family="Arial" font-size="13.00" fill="#b6ecf7">BigQuery Table</text>
<text xml:space="preserve" text-anchor="start" x="3074.51" y="-948.2" font-family="Arial" font-size="15.00" fill="#b6ecf7">Stores organizations, walk&#45;in cold storage</text>
<text xml:space="preserve" text-anchor="start" x="3073.24" y="-930.2" font-family="Arial" font-size="15.00" fill="#b6ecf7">capacity, pickup windows, and embedding</text>
<text xml:space="preserve" text-anchor="start" x="3187.07" y="-912.2" font-family="Arial" font-size="15.00" fill="#b6ecf7">vectors.</text>
</g>
<!-- tract&#45;demographics -->
<g id="node12" class="node">
<title>tract&#45;demographics</title>
<polygon fill="#0284c7" stroke="#0369a1" stroke-width="0" points="3385.04,-760 3041.61,-760 3041.61,-580 3385.04,-580 3385.04,-760"/>
<text xml:space="preserve" text-anchor="start" x="3086.61" y="-700.8" font-family="Arial" font-size="20.00" fill="#f0f9ff">Census Tract Demographics</text>
<text xml:space="preserve" text-anchor="start" x="3111.8" y="-679.8" font-family="Arial" font-size="13.00" fill="#b6ecf7">BigQuery Table &amp; Spatial Polygons</text>
<text xml:space="preserve" text-anchor="start" x="3081.61" y="-658.2" font-family="Arial" font-size="15.00" fill="#b6ecf7">Cook County tract demographic metrics</text>
<text xml:space="preserve" text-anchor="start" x="3084.93" y="-640.2" font-family="Arial" font-size="15.00" fill="#b6ecf7">(poverty rate, zero&#45;vehicle percentage,</text>
<text xml:space="preserve" text-anchor="start" x="3151.63" y="-622.2" font-family="Arial" font-size="15.00" fill="#b6ecf7">internal centroids).</text>
</g>
<!-- traffic&#45;router -->
<g id="node13" class="node">
<title>traffic&#45;router</title>
<polygon fill="#0284c7" stroke="#0369a1" stroke-width="0" points="2584.32,-760 2226.42,-760 2226.42,-580 2584.32,-580 2584.32,-760"/>
<text xml:space="preserve" text-anchor="start" x="2266.42" y="-691.8" font-family="Arial" font-size="20.00" fill="#f0f9ff">Chicago Traffic &amp; Route Router</text>
<text xml:space="preserve" text-anchor="start" x="2385.14" y="-670.8" font-family="Arial" font-size="13.00" fill="#b6ecf7">Python</text>
<text xml:space="preserve" text-anchor="start" x="2284.49" y="-649.2" font-family="Arial" font-size="15.00" fill="#b6ecf7">Computes real&#45;time driving duration,</text>
<text xml:space="preserve" text-anchor="start" x="2279.47" y="-631.2" font-family="Arial" font-size="15.00" fill="#b6ecf7">congestion delay, and safety margins.</text>
</g>
<!-- chicago&#45;traffic -->
<g id="node14" class="node">
<title>chicago&#45;traffic</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="3373.35,-470 3053.31,-470 3053.31,-290 3373.35,-290 3373.35,-470"/>
<text xml:space="preserve" text-anchor="start" x="3078.29" y="-401.8" font-family="Arial" font-size="20.00" fill="#f8fafc">City of Chicago Traffic Tracker</text>
<text xml:space="preserve" text-anchor="start" x="3128.8" y="-380.8" font-family="Arial" font-size="13.00" fill="#cbd5e1">Civic Open Data API / OSRM</text>
<text xml:space="preserve" text-anchor="start" x="3078.66" y="-359.2" font-family="Arial" font-size="15.00" fill="#cbd5e1">Live congestion and arterial traffic speed</text>
<text xml:space="preserve" text-anchor="start" x="3105.36" y="-341.2" font-family="Arial" font-size="15.00" fill="#cbd5e1">feed for transit ETA calculations.</text>
</g>
<!-- broker&#45;agent -->
<g id="node15" class="node">
<title>broker&#45;agent</title>
<polygon fill="#0284c7" stroke="#0369a1" stroke-width="0" points="2582.11,-470 2228.64,-470 2228.64,-290 2582.11,-290 2582.11,-470"/>
<text xml:space="preserve" text-anchor="start" x="2286.42" y="-410.8" font-family="Arial" font-size="20.00" fill="#f0f9ff">Surplus Broker Root Agent</text>
<text xml:space="preserve" text-anchor="start" x="2316.5" y="-389.8" font-family="Arial" font-size="13.00" fill="#b6ecf7">Google ADK, Gemini 2.5 Flash</text>
<text xml:space="preserve" text-anchor="start" x="2273.23" y="-368.2" font-family="Arial" font-size="15.00" fill="#b6ecf7">Evaluates offers, invokes logistics tools,</text>
<text xml:space="preserve" text-anchor="start" x="2268.64" y="-350.2" font-family="Arial" font-size="15.00" fill="#b6ecf7">weighs trade&#45;offs, and synthesizes 7&#45;part</text>
<text xml:space="preserve" text-anchor="start" x="2362.44" y="-332.2" font-family="Arial" font-size="15.00" fill="#b6ecf7">match briefs.</text>
</g>
<!-- gemini -->
<g id="node16" class="node">
<title>gemini</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="3373.35,-180 3053.31,-180 3053.31,0 3373.35,0 3373.35,-180"/>
<text xml:space="preserve" text-anchor="start" x="3096.06" y="-120.8" font-family="Arial" font-size="20.00" fill="#f8fafc">Google Gemini (Vertex AI)</text>
<text xml:space="preserve" text-anchor="start" x="3123.01" y="-99.8" font-family="Arial" font-size="13.00" fill="#cbd5e1">Gemini 2.5/3.8 Flash, Vertex AI</text>
<text xml:space="preserve" text-anchor="start" x="3092.01" y="-78.2" font-family="Arial" font-size="15.00" fill="#cbd5e1">Foundation LLM providing multi&#45;step</text>
<text xml:space="preserve" text-anchor="start" x="3088.68" y="-60.2" font-family="Arial" font-size="15.00" fill="#cbd5e1">reasoning, match&#45;brief synthesis, and</text>
<text xml:space="preserve" text-anchor="start" x="3140.78" y="-42.2" font-family="Arial" font-size="15.00" fill="#cbd5e1">conversational intake.</text>
</g>
<!-- cascading&#45;dispatcher -->
<g id="node17" class="node">
<title>cascading&#45;dispatcher</title>
<polygon fill="#0284c7" stroke="#0369a1" stroke-width="0" points="2572.12,-180 2238.63,-180 2238.63,0 2572.12,0 2572.12,-180"/>
<text xml:space="preserve" text-anchor="start" x="2282.52" y="-120.8" font-family="Arial" font-size="20.00" fill="#f0f9ff">Cascading Dispatch Engine</text>
<text xml:space="preserve" text-anchor="start" x="2385.14" y="-99.8" font-family="Arial" font-size="13.00" fill="#b6ecf7">Python</text>
<text xml:space="preserve" text-anchor="start" x="2278.63" y="-78.2" font-family="Arial" font-size="15.00" fill="#b6ecf7">Generates tailored dispatch alerts and</text>
<text xml:space="preserve" text-anchor="start" x="2289.07" y="-60.2" font-family="Arial" font-size="15.00" fill="#b6ecf7">instantly shifts to backup pantries if</text>
<text xml:space="preserve" text-anchor="start" x="2348.69" y="-42.2" font-family="Arial" font-size="15.00" fill="#b6ecf7">primary declines.</text>
</g>
<!-- donor&#45;&gt;web&#45;ui -->
<g id="edge1" class="edge">
<title>donor&#45;&gt;web&#45;ui</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M319.88,-895.45C438.7,-871.85 600.89,-839.63 722.09,-815.56"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="722.4,-818.18 729.24,-814.14 721.37,-813.03 722.4,-818.18"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="383.04,-883.1 383.04,-922.7 407.04,-922.7 407.04,-883.1 383.04,-883.1"/>
<text xml:space="preserve" text-anchor="start" x="391.15" y="-899.7" font-family="Arial" font-weight="bold" font-size="14.00" fill="#c9c9c9">0</text>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="410.04,-883.1 410.04,-922.7 668.94,-922.7 668.94,-883.1 410.04,-883.1"/>
<text xml:space="preserve" text-anchor="start" x="413.04" y="-905.7" font-family="Arial" font-size="14.00" fill="#c9c9c9">1. Submits 10 crates spinach with 6&#45;hour</text>
<text xml:space="preserve" text-anchor="start" x="513.02" y="-888.9" font-family="Arial" font-size="14.00" fill="#c9c9c9">deadline</text>
</g>
<!-- coordinator&#45;&gt;web&#45;ui -->
<g id="edge17" class="edge">
<title>coordinator&#45;&gt;web&#45;ui</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M319.88,-668.55C438.7,-692.15 600.89,-724.37 722.09,-748.44"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="721.37,-750.97 729.24,-749.86 722.4,-745.82 721.37,-750.97"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="403,-738.1 403,-777.7 434.57,-777.7 434.57,-738.1 403,-738.1"/>
<text xml:space="preserve" text-anchor="start" x="411" y="-754.7" font-family="Arial" font-weight="bold" font-size="14.00" fill="#c9c9c9">16</text>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="437.57,-738.1 437.57,-777.7 648.99,-777.7 648.99,-738.1 437.57,-738.1"/>
<text xml:space="preserve" text-anchor="start" x="440.57" y="-760.7" font-family="Arial" font-size="14.00" fill="#c9c9c9">17. Primary pantry declines offer:</text>
<text xml:space="preserve" text-anchor="start" x="480.25" y="-743.9" font-family="Arial" font-size="14.00" fill="#c9c9c9">clicks [They said no]</text>
</g>
<!-- web&#45;ui&#45;&gt;api&#45;backend -->
<g id="edge2" class="edge">
<title>web&#45;ui&#45;&gt;api&#45;backend</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M1021.59,-871.99C1050.19,-887.67 1081.24,-901.63 1112.18,-910 1243.66,-945.59 1286.92,-944.63 1418.66,-910 1447.33,-902.47 1476.18,-890.39 1503.24,-876.59"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="1504.22,-879.04 1509.66,-873.25 1501.8,-874.39 1504.22,-879.04"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1180.86,-939.33 1180.86,-978.93 1204.86,-978.93 1204.86,-939.33 1180.86,-939.33"/>
<text xml:space="preserve" text-anchor="start" x="1188.97" y="-955.93" font-family="Arial" font-weight="bold" font-size="14.00" fill="#c9c9c9">1</text>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1207.86,-939.33 1207.86,-978.93 1349.98,-978.93 1349.98,-939.33 1207.86,-939.33"/>
<text xml:space="preserve" text-anchor="start" x="1217.84" y="-961.93" font-family="Arial" font-size="14.00" fill="#c9c9c9">2. POST /api/match</text>
<text xml:space="preserve" text-anchor="start" x="1210.86" y="-945.13" font-family="Arial" font-size="14.00" fill="#c9c9c9">HTTPS / JSON REST</text>
</g>
<!-- web&#45;ui&#45;&gt;api&#45;backend -->
<g id="edge16" class="edge">
<title>web&#45;ui&#45;&gt;api&#45;backend</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M1062.52,-782C1186.98,-782 1355.23,-782 1478.96,-782"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="1062.66,-779.38 1055.16,-782 1062.66,-784.63 1062.66,-779.38"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1115.18,-785 1115.18,-824.6 1146.75,-824.6 1146.75,-785 1115.18,-785"/>
<text xml:space="preserve" text-anchor="start" x="1123.18" y="-801.6" font-family="Arial" font-weight="bold" font-size="14.00" fill="#c9c9c9">15</text>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1149.75,-785 1149.75,-824.6 1415.66,-824.6 1415.66,-785 1149.75,-785"/>
<text xml:space="preserve" text-anchor="start" x="1152.75" y="-807.6" font-family="Arial" font-size="14.00" fill="#c9c9c9">16. Render Match Card, Leaflet Map pins,</text>
<text xml:space="preserve" text-anchor="start" x="1211.49" y="-790.8" font-family="Arial" font-size="14.00" fill="#c9c9c9">and Decoy explanation</text>
</g>
<!-- web&#45;ui&#45;&gt;api&#45;backend -->
<g id="edge18" class="edge">
<title>web&#45;ui&#45;&gt;api&#45;backend</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M1051.94,-722.83C1071.98,-717.31 1092.39,-712.59 1112.18,-709.4 1246.65,-687.7 1284.08,-688.37 1418.66,-709.4 1435.13,-711.97 1452.03,-715.54 1468.82,-719.72"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="1467.84,-722.18 1475.76,-721.49 1469.15,-717.09 1467.84,-722.18"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1147.09,-712.4 1147.09,-752 1178.66,-752 1178.66,-712.4 1147.09,-712.4"/>
<text xml:space="preserve" text-anchor="start" x="1155.09" y="-729" font-family="Arial" font-weight="bold" font-size="14.00" fill="#c9c9c9">17</text>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1181.66,-712.4 1181.66,-752 1383.75,-752 1383.75,-712.4 1181.66,-712.4"/>
<text xml:space="preserve" text-anchor="start" x="1184.66" y="-735" font-family="Arial" font-size="14.00" fill="#c9c9c9">18. POST /api/dispatch&#45;fallback</text>
<text xml:space="preserve" text-anchor="start" x="1214.64" y="-718.2" font-family="Arial" font-size="14.00" fill="#c9c9c9">HTTPS / JSON REST</text>
</g>
<!-- web&#45;ui&#45;&gt;api&#45;backend -->
<g id="edge20" class="edge">
<title>web&#45;ui&#45;&gt;api&#45;backend</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M995.34,-685.82C1029.85,-659.36 1070.3,-634.17 1112.18,-620.4 1241.58,-577.84 1288.93,-578.88 1418.66,-620.4 1465.03,-635.24 1510.01,-663.43 1547.5,-692.16"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="993.85,-683.66 989.55,-690.34 997.08,-687.8 993.85,-683.66"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1117.12,-623.4 1117.12,-663 1148.69,-663 1148.69,-623.4 1117.12,-623.4"/>
<text xml:space="preserve" text-anchor="start" x="1125.12" y="-640" font-family="Arial" font-weight="bold" font-size="14.00" fill="#c9c9c9">19</text>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1151.69,-623.4 1151.69,-663 1413.72,-663 1413.72,-623.4 1151.69,-623.4"/>
<text xml:space="preserve" text-anchor="start" x="1154.69" y="-646" font-family="Arial" font-size="14.00" fill="#c9c9c9">20. Instant re&#45;dispatch with updated SMS</text>
<text xml:space="preserve" text-anchor="start" x="1269.09" y="-629.2" font-family="Arial" font-size="14.00" fill="#c9c9c9">alert</text>
</g>
<!-- api&#45;backend&#45;&gt;clock&#45;calc -->
<g id="edge3" class="edge">
<title>api&#45;backend&#45;&gt;clock&#45;calc</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M1677.83,-871.63C1714.87,-973 1783.71,-1140.3 1873.92,-1266 1990.56,-1428.54 2163.48,-1582.66 2279.87,-1677.62"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="2277.98,-1679.47 2285.46,-1682.17 2281.3,-1675.4 2277.98,-1679.47"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1876.92,-1562.39 1876.92,-1595.19 1900.92,-1595.19 1900.92,-1562.39 1876.92,-1562.39"/>
<text xml:space="preserve" text-anchor="start" x="1885.03" y="-1575.59" font-family="Arial" font-weight="bold" font-size="14.00" fill="#c9c9c9">2</text>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1903.92,-1562.39 1903.92,-1595.19 2146.48,-1595.19 2146.48,-1562.39 1903.92,-1562.39"/>
<text xml:space="preserve" text-anchor="start" x="1906.92" y="-1573.19" font-family="Arial" font-size="14.00" fill="#c9c9c9">3. Calculate effective shelf&#45;life window</text>
</g>
<!-- api&#45;backend&#45;&gt;recall&#45;checker -->
<g id="edge5" class="edge">
<title>api&#45;backend&#45;&gt;recall&#45;checker</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M1752.56,-871.68C1894.26,-992.41 2145.36,-1206.33 2291.06,-1330.46"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="2289.07,-1332.21 2296.48,-1335.08 2292.47,-1328.21 2289.07,-1332.21"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1896.78,-1202.96 1896.78,-1235.76 1920.78,-1235.76 1920.78,-1202.96 1896.78,-1202.96"/>
<text xml:space="preserve" text-anchor="start" x="1904.88" y="-1216.16" font-family="Arial" font-weight="bold" font-size="14.00" fill="#c9c9c9">4</text>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1923.78,-1202.96 1923.78,-1235.76 2126.62,-1235.76 2126.62,-1202.96 1923.78,-1202.96"/>
<text xml:space="preserve" text-anchor="start" x="1926.78" y="-1213.76" font-family="Arial" font-size="14.00" fill="#c9c9c9">5. Screen for active FDA recalls</text>
</g>
<!-- api&#45;backend&#45;&gt;matcher -->
<g id="edge7" class="edge">
<title>api&#45;backend&#45;&gt;matcher</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M1813.91,-821.17C1934.18,-849.45 2096.58,-887.63 2220.62,-916.8"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="2219.76,-919.29 2227.66,-918.45 2220.96,-914.18 2219.76,-919.29"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1889.74,-900.34 1889.74,-933.14 1913.74,-933.14 1913.74,-900.34 1889.74,-900.34"/>
<text xml:space="preserve" text-anchor="start" x="1897.85" y="-913.54" font-family="Arial" font-weight="bold" font-size="14.00" fill="#c9c9c9">6</text>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1916.74,-900.34 1916.74,-933.14 2133.65,-933.14 2133.65,-900.34 1916.74,-900.34"/>
<text xml:space="preserve" text-anchor="start" x="1919.74" y="-911.14" font-family="Arial" font-size="14.00" fill="#c9c9c9">7. Find and rank qualified pantries</text>
</g>
<!-- api&#45;backend&#45;&gt;traffic&#45;router -->
<g id="edge12" class="edge">
<title>api&#45;backend&#45;&gt;traffic&#45;router</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M1813.69,-753.9C1833.96,-750.62 1854.41,-747.39 1873.92,-744.4 1987.34,-727.04 2114.66,-709.13 2216.13,-695.23"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="2216.41,-697.84 2223.49,-694.23 2215.7,-692.64 2216.41,-697.84"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1882.08,-747.4 1882.08,-787 1913.65,-787 1913.65,-747.4 1882.08,-747.4"/>
<text xml:space="preserve" text-anchor="start" x="1890.08" y="-764" font-family="Arial" font-weight="bold" font-size="14.00" fill="#c9c9c9">11</text>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1916.65,-747.4 1916.65,-787 2141.32,-787 2141.32,-747.4 1916.65,-747.4"/>
<text xml:space="preserve" text-anchor="start" x="1919.65" y="-770" font-family="Arial" font-size="14.00" fill="#c9c9c9">12. Compute route driving time and</text>
<text xml:space="preserve" text-anchor="start" x="1976.45" y="-753.2" font-family="Arial" font-size="14.00" fill="#c9c9c9">congestion delay</text>
</g>
<!-- api&#45;backend&#45;&gt;broker&#45;agent -->
<g id="edge14" class="edge">
<title>api&#45;backend&#45;&gt;broker&#45;agent</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M1784.59,-692.18C1813.74,-674.05 1844.57,-655.56 1873.92,-639.2 1986.47,-576.48 2116.39,-512.86 2219.49,-464.34"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="2220.33,-466.84 2226.01,-461.28 2218.1,-462.09 2220.33,-466.84"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1887.14,-642.2 1887.14,-675 1918.72,-675 1918.72,-642.2 1887.14,-642.2"/>
<text xml:space="preserve" text-anchor="start" x="1895.14" y="-655.4" font-family="Arial" font-weight="bold" font-size="14.00" fill="#c9c9c9">13</text>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1921.72,-642.2 1921.72,-675 2136.25,-675 2136.25,-642.2 1921.72,-642.2"/>
<text xml:space="preserve" text-anchor="start" x="1924.72" y="-653" font-family="Arial" font-size="14.00" fill="#c9c9c9">14. Synthesize 7&#45;Part Match Brief</text>
</g>
<!-- api&#45;backend&#45;&gt;cascading&#45;dispatcher -->
<g id="edge19" class="edge">
<title>api&#45;backend&#45;&gt;cascading&#45;dispatcher</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M1691.84,-692.23C1732.19,-617.03 1797,-509.98 1873.92,-433.2 1978.33,-329 2119.43,-239.56 2229.85,-178.14"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="2230.82,-180.6 2236.11,-174.67 2228.28,-176.01 2230.82,-180.6"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1885.2,-436.2 1885.2,-469 1916.77,-469 1916.77,-436.2 1885.2,-436.2"/>
<text xml:space="preserve" text-anchor="start" x="1893.2" y="-449.4" font-family="Arial" font-weight="bold" font-size="14.00" fill="#c9c9c9">18</text>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1919.77,-436.2 1919.77,-469 2138.2,-469 2138.2,-436.2 1919.77,-436.2"/>
<text xml:space="preserve" text-anchor="start" x="1922.77" y="-447" font-family="Arial" font-size="14.00" fill="#c9c9c9">19. Promote Backup #2 to primary</text>
</g>
<!-- clock&#45;calc&#45;&gt;shelf&#45;life&#45;data -->
<g id="edge4" class="edge">
<title>clock&#45;calc&#45;&gt;shelf&#45;life&#45;data</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M2601.22,-1787.54C2726.63,-1796.25 2889.11,-1807.54 3015,-1816.29"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="3014.46,-1818.88 3022.13,-1816.78 3014.83,-1813.65 3014.46,-1818.88"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="2687.2,-1814.89 2687.2,-1847.69 2711.2,-1847.69 2711.2,-1814.89 2687.2,-1814.89"/>
<text xml:space="preserve" text-anchor="start" x="2695.31" y="-1828.09" font-family="Arial" font-weight="bold" font-size="14.00" fill="#c9c9c9">3</text>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="2714.2,-1814.89 2714.2,-1847.69 2931.88,-1847.69 2931.88,-1814.89 2714.2,-1814.89"/>
<text xml:space="preserve" text-anchor="start" x="2717.2" y="-1825.69" font-family="Arial" font-size="14.00" fill="#c9c9c9">4. Lookup spinach USDA shelf life</text>
</g>
<!-- recall&#45;checker&#45;&gt;openfda -->
<g id="edge6" class="edge">
<title>recall&#45;checker&#45;&gt;openfda</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M2580.76,-1451.45C2715.55,-1470.35 2901.32,-1496.4 3036.48,-1515.35"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="3035.74,-1517.89 3043.53,-1516.33 3036.47,-1512.69 3035.74,-1517.89"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="2718.73,-1506.45 2718.73,-1546.05 2742.73,-1546.05 2742.73,-1506.45 2718.73,-1506.45"/>
<text xml:space="preserve" text-anchor="start" x="2726.84" y="-1523.05" font-family="Arial" font-weight="bold" font-size="14.00" fill="#c9c9c9">5</text>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="2745.73,-1506.45 2745.73,-1546.05 2900.36,-1546.05 2900.36,-1506.45 2745.73,-1506.45"/>
<text xml:space="preserve" text-anchor="start" x="2748.73" y="-1529.05" font-family="Arial" font-size="14.00" fill="#c9c9c9">6. Query food recall API</text>
<text xml:space="preserve" text-anchor="start" x="2779.48" y="-1512.25" font-family="Arial" font-size="14.00" fill="#c9c9c9">HTTPS REST</text>
</g>
<!-- matcher&#45;&gt;matcher -->
<g id="edge10" class="edge">
<title>matcher&#45;&gt;matcher</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M2336.92,-1049.98C2320.08,-1106.28 2342.9,-1160 2405.37,-1160 2464.06,-1160 2487.76,-1112.58 2476.45,-1060.17"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="2478.99,-1059.52 2474.58,-1052.91 2473.91,-1060.83 2478.99,-1059.52"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="2265.54,-1163 2265.54,-1202.6 2289.54,-1202.6 2289.54,-1163 2265.54,-1163"/>
<text xml:space="preserve" text-anchor="start" x="2273.65" y="-1179.6" font-family="Arial" font-weight="bold" font-size="14.00" fill="#c9c9c9">9</text>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="2292.54,-1163 2292.54,-1202.6 2545.21,-1202.6 2545.21,-1163 2292.54,-1163"/>
<text xml:space="preserve" text-anchor="start" x="2295.54" y="-1185.6" font-family="Arial" font-size="14.00" fill="#c9c9c9">10. Hard&#45;filter Greenline decoy (No cold</text>
<text xml:space="preserve" text-anchor="start" x="2393.2" y="-1168.8" font-family="Arial" font-size="14.00" fill="#c9c9c9">storage)</text>
</g>
<!-- matcher&#45;&gt;vector&#45;index -->
<g id="edge8" class="edge">
<title>matcher&#45;&gt;vector&#45;index</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M2580.26,-1022.57C2705.88,-1067.77 2875.97,-1128.97 3008.06,-1176.5"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="3007.11,-1178.95 3015.06,-1179.02 3008.89,-1174.01 3007.11,-1178.95"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="2664.27,-1159.2 2664.27,-1192 2688.27,-1192 2688.27,-1159.2 2664.27,-1159.2"/>
<text xml:space="preserve" text-anchor="start" x="2672.38" y="-1172.4" font-family="Arial" font-weight="bold" font-size="14.00" fill="#c9c9c9">7</text>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="2691.27,-1159.2 2691.27,-1192 2954.81,-1192 2954.81,-1159.2 2691.27,-1159.2"/>
<text xml:space="preserve" text-anchor="start" x="2694.27" y="-1170" font-family="Arial" font-size="14.00" fill="#c9c9c9">8. Run VECTOR_SEARCH on profile text</text>
</g>
<!-- matcher&#45;&gt;recipients&#45;data -->
<g id="edge9" class="edge">
<title>matcher&#45;&gt;recipients&#45;data</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M2580.26,-960C2710.71,-960 2889.13,-960 3023.14,-960"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="3022.99,-962.63 3030.49,-960 3022.99,-957.38 3022.99,-962.63"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="2691.1,-963 2691.1,-995.8 2715.1,-995.8 2715.1,-963 2691.1,-963"/>
<text xml:space="preserve" text-anchor="start" x="2699.21" y="-976.2" font-family="Arial" font-weight="bold" font-size="14.00" fill="#c9c9c9">8</text>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="2718.1,-963 2718.1,-995.8 2927.98,-995.8 2927.98,-963 2718.1,-963"/>
<text xml:space="preserve" text-anchor="start" x="2721.1" y="-973.8" font-family="Arial" font-size="14.00" fill="#c9c9c9">9. Check cold storage &amp; capacity</text>
</g>
<!-- matcher&#45;&gt;tract&#45;demographics -->
<g id="edge11" class="edge">
<title>matcher&#45;&gt;tract&#45;demographics</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M2580.26,-897.43C2713.69,-849.42 2897.28,-783.36 3032.23,-734.8"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="3032.85,-737.37 3039.01,-732.36 3031.07,-732.43 3032.85,-737.37"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="2672.16,-869.2 2672.16,-908.8 2703.73,-908.8 2703.73,-869.2 2672.16,-869.2"/>
<text xml:space="preserve" text-anchor="start" x="2680.16" y="-885.8" font-family="Arial" font-weight="bold" font-size="14.00" fill="#c9c9c9">10</text>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="2706.73,-869.2 2706.73,-908.8 2946.93,-908.8 2946.93,-869.2 2706.73,-869.2"/>
<text xml:space="preserve" text-anchor="start" x="2709.73" y="-891.8" font-family="Arial" font-size="14.00" fill="#c9c9c9">11. Enrich with tract vehicle&#45;insecurity</text>
<text xml:space="preserve" text-anchor="start" x="2820.6" y="-875" font-family="Arial" font-size="14.00" fill="#c9c9c9">%</text>
</g>
<!-- traffic&#45;router&#45;&gt;chicago&#45;traffic -->
<g id="edge13" class="edge">
<title>traffic&#45;router&#45;&gt;chicago&#45;traffic</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M2584.24,-606C2721.18,-556.72 2909.19,-489.08 3043.75,-440.66"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="3044.32,-443.24 3050.49,-438.23 3042.55,-438.3 3044.32,-443.24"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="2674.87,-579.2 2674.87,-618.8 2706.44,-618.8 2706.44,-579.2 2674.87,-579.2"/>
<text xml:space="preserve" text-anchor="start" x="2682.87" y="-595.8" font-family="Arial" font-weight="bold" font-size="14.00" fill="#c9c9c9">12</text>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="2709.44,-579.2 2709.44,-618.8 2944.22,-618.8 2944.22,-579.2 2709.44,-579.2"/>
<text xml:space="preserve" text-anchor="start" x="2712.44" y="-601.8" font-family="Arial" font-size="14.00" fill="#c9c9c9">13. Query Chicago live traffic speeds</text>
<text xml:space="preserve" text-anchor="start" x="2783.27" y="-585" font-family="Arial" font-size="14.00" fill="#c9c9c9">HTTPS REST</text>
</g>
<!-- broker&#45;agent&#45;&gt;gemini -->
<g id="edge15" class="edge">
<title>broker&#45;agent&#45;&gt;gemini</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M2581.75,-316.9C2718.88,-267.55 2908.34,-199.38 3043.71,-150.67"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="3044.35,-153.23 3050.52,-148.22 3042.57,-148.29 3044.35,-153.23"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="2665.88,-289.2 2665.88,-345.6 2697.46,-345.6 2697.46,-289.2 2665.88,-289.2"/>
<text xml:space="preserve" text-anchor="start" x="2673.88" y="-314.2" font-family="Arial" font-weight="bold" font-size="14.00" fill="#c9c9c9">14</text>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="2700.46,-289.2 2700.46,-345.6 2953.2,-345.6 2953.2,-289.2 2700.46,-289.2"/>
<text xml:space="preserve" text-anchor="start" x="2703.46" y="-328.6" font-family="Arial" font-size="14.00" fill="#c9c9c9">15. Generate reasoned explanation and</text>
<text xml:space="preserve" text-anchor="start" x="2792.21" y="-311.8" font-family="Arial" font-size="14.00" fill="#c9c9c9">driver SMS</text>
<text xml:space="preserve" text-anchor="start" x="2779.38" y="-295" font-family="Arial" font-size="14.00" fill="#c9c9c9">gRPC / HTTPS</text>
</g>
</g>
</svg>
`;case`pantry-onboarding-flow`:return`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
 "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<!-- Generated by graphviz version 16.1.0 (0)
 -->
<!-- Pages: 1 -->
<svg width="3363pt" height="516pt"
 viewBox="0.00 0.00 3363.00 516.00" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g id="graph0" class="graph" transform="scale(1 1) rotate(0) translate(15.05 501.05)">
<!-- pantry -->
<g id="node1" class="node">
<title>pantry</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="347.81,-341 0,-341 0,-161 347.81,-161 347.81,-341"/>
<text xml:space="preserve" text-anchor="start" x="99.42" y="-263" font-family="Arial" font-size="20.00" fill="#f8fafc">Pantry Volunteer</text>
<text xml:space="preserve" text-anchor="start" x="35.91" y="-240" font-family="Arial" font-size="15.00" fill="#cbd5e1">Pantry coordinators and shelter operators</text>
<text xml:space="preserve" text-anchor="start" x="20.06" y="-222" font-family="Arial" font-size="15.00" fill="#cbd5e1">receiving dispatches and onboarding capacity.</text>
</g>
<!-- web&#45;ui -->
<g id="node2" class="node">
<title>web&#45;ui</title>
<polygon fill="#6366f1" stroke="#4f46e5" stroke-width="0" points="1033.29,-341 713.06,-341 713.06,-161 1033.29,-161 1033.29,-341"/>
<text xml:space="preserve" text-anchor="start" x="737.55" y="-281.8" font-family="Arial" font-size="20.00" fill="#eef2ff">RescueDispatch Web Console</text>
<text xml:space="preserve" text-anchor="start" x="801.65" y="-260.8" font-family="Arial" font-size="13.00" fill="#c7d2fe">HTML5, Leaflet.js, CSS3</text>
<text xml:space="preserve" text-anchor="start" x="756.03" y="-239.2" font-family="Arial" font-size="15.00" fill="#c7d2fe">Interactive console featuring 1&#45;click</text>
<text xml:space="preserve" text-anchor="start" x="733.11" y="-221.2" font-family="Arial" font-size="15.00" fill="#c7d2fe">scenarios, live Chicago map, 7&#45;part match</text>
<text xml:space="preserve" text-anchor="start" x="743.54" y="-203.2" font-family="Arial" font-size="15.00" fill="#c7d2fe">briefs, and smartphone SMS simulator.</text>
</g>
<!-- api&#45;backend -->
<g id="node3" class="node">
<title>api&#45;backend</title>
<polygon fill="#6366f1" stroke="#4f46e5" stroke-width="0" points="1766.44,-341 1431.18,-341 1431.18,-161 1766.44,-161 1766.44,-341"/>
<text xml:space="preserve" text-anchor="start" x="1485.43" y="-281.8" font-family="Arial" font-size="20.00" fill="#eef2ff">FastAPI Dispatch Service</text>
<text xml:space="preserve" text-anchor="start" x="1511.74" y="-260.8" font-family="Arial" font-size="13.00" fill="#c7d2fe">Python 3.11, FastAPI, Uvicorn</text>
<text xml:space="preserve" text-anchor="start" x="1451.24" y="-239.2" font-family="Arial" font-size="15.00" fill="#c7d2fe">REST API handling match requests, fallback</text>
<text xml:space="preserve" text-anchor="start" x="1465.81" y="-221.2" font-family="Arial" font-size="15.00" fill="#c7d2fe">cascading, live equity audits, and pantry</text>
<text xml:space="preserve" text-anchor="start" x="1559.19" y="-203.2" font-family="Arial" font-size="15.00" fill="#c7d2fe">onboarding.</text>
</g>
<!-- intake&#45;agent -->
<g id="node4" class="node">
<title>intake&#45;agent</title>
<polygon fill="#0284c7" stroke="#0369a1" stroke-width="0" points="2566.75,-341 2172.12,-341 2172.12,-161 2566.75,-161 2566.75,-341"/>
<text xml:space="preserve" text-anchor="start" x="2212.12" y="-281.8" font-family="Arial" font-size="20.00" fill="#f0f9ff">Conversational Pantry Intake Agent</text>
<text xml:space="preserve" text-anchor="start" x="2296.44" y="-260.8" font-family="Arial" font-size="13.00" fill="#b6ecf7">Conversational Subagent</text>
<text xml:space="preserve" text-anchor="start" x="2223.12" y="-239.2" font-family="Arial" font-size="15.00" fill="#b6ecf7">Interviews new pantry coordinators, extracts</text>
<text xml:space="preserve" text-anchor="start" x="2235.19" y="-221.2" font-family="Arial" font-size="15.00" fill="#b6ecf7">capacity schemas, and generates profile</text>
<text xml:space="preserve" text-anchor="start" x="2351.51" y="-203.2" font-family="Arial" font-size="15.00" fill="#b6ecf7">texts.</text>
</g>
<!-- gemini -->
<g id="node5" class="node">
<title>gemini</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="3312.5,-486 2992.46,-486 2992.46,-306 3312.5,-306 3312.5,-486"/>
<text xml:space="preserve" text-anchor="start" x="3035.22" y="-426.8" font-family="Arial" font-size="20.00" fill="#f8fafc">Google Gemini (Vertex AI)</text>
<text xml:space="preserve" text-anchor="start" x="3062.17" y="-405.8" font-family="Arial" font-size="13.00" fill="#cbd5e1">Gemini 2.5/3.8 Flash, Vertex AI</text>
<text xml:space="preserve" text-anchor="start" x="3031.17" y="-384.2" font-family="Arial" font-size="15.00" fill="#cbd5e1">Foundation LLM providing multi&#45;step</text>
<text xml:space="preserve" text-anchor="start" x="3027.84" y="-366.2" font-family="Arial" font-size="15.00" fill="#cbd5e1">reasoning, match&#45;brief synthesis, and</text>
<text xml:space="preserve" text-anchor="start" x="3079.94" y="-348.2" font-family="Arial" font-size="15.00" fill="#cbd5e1">conversational intake.</text>
</g>
<!-- recipients&#45;data -->
<g id="node6" class="node">
<title>recipients&#45;data</title>
<polygon fill="#0284c7" stroke="#0369a1" stroke-width="0" points="3332.57,-180 2972.4,-180 2972.4,0 3332.57,0 3332.57,-180"/>
<text xml:space="preserve" text-anchor="start" x="3019.09" y="-120.8" font-family="Arial" font-size="20.00" fill="#f0f9ff">Recipients &amp; Capacities Table</text>
<text xml:space="preserve" text-anchor="start" x="3107.32" y="-99.8" font-family="Arial" font-size="13.00" fill="#b6ecf7">BigQuery Table</text>
<text xml:space="preserve" text-anchor="start" x="3013.66" y="-78.2" font-family="Arial" font-size="15.00" fill="#b6ecf7">Stores organizations, walk&#45;in cold storage</text>
<text xml:space="preserve" text-anchor="start" x="3012.4" y="-60.2" font-family="Arial" font-size="15.00" fill="#b6ecf7">capacity, pickup windows, and embedding</text>
<text xml:space="preserve" text-anchor="start" x="3126.23" y="-42.2" font-family="Arial" font-size="15.00" fill="#b6ecf7">vectors.</text>
</g>
<!-- pantry&#45;&gt;web&#45;ui -->
<g id="edge1" class="edge">
<title>pantry&#45;&gt;web&#45;ui</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M347.71,-251C456.13,-251 595.28,-251 703.01,-251"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="702.8,-253.63 710.3,-251 702.8,-248.38 702.8,-253.63"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="410.81,-254 410.81,-293.6 434.81,-293.6 434.81,-254 410.81,-254"/>
<text xml:space="preserve" text-anchor="start" x="418.92" y="-270.6" font-family="Arial" font-weight="bold" font-size="14.00" fill="#c9c9c9">0</text>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="437.81,-254 437.81,-293.6 650.06,-293.6 650.06,-254 437.81,-254"/>
<text xml:space="preserve" text-anchor="start" x="464.95" y="-276.6" font-family="Arial" font-size="14.00" fill="#c9c9c9">1. Enters pantry details in</text>
<text xml:space="preserve" text-anchor="start" x="440.81" y="-259.8" font-family="Arial" font-size="14.00" fill="#c9c9c9">conversational onboarding modal</text>
</g>
<!-- web&#45;ui&#45;&gt;api&#45;backend -->
<g id="edge2" class="edge">
<title>web&#45;ui&#45;&gt;api&#45;backend</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M1032.98,-251C1147.59,-251 1302.37,-251 1420.93,-251"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="1420.67,-253.63 1428.17,-251 1420.67,-248.38 1420.67,-253.63"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1147.67,-254 1147.67,-293.6 1171.67,-293.6 1171.67,-254 1147.67,-254"/>
<text xml:space="preserve" text-anchor="start" x="1155.78" y="-270.6" font-family="Arial" font-weight="bold" font-size="14.00" fill="#c9c9c9">1</text>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1174.67,-254 1174.67,-293.6 1316.8,-293.6 1316.8,-254 1174.67,-254"/>
<text xml:space="preserve" text-anchor="start" x="1185.04" y="-276.6" font-family="Arial" font-size="14.00" fill="#c9c9c9">2. POST /api/intake</text>
<text xml:space="preserve" text-anchor="start" x="1177.67" y="-259.8" font-family="Arial" font-size="14.00" fill="#c9c9c9">HTTPS / JSON REST</text>
</g>
<!-- web&#45;ui&#45;&gt;api&#45;backend -->
<g id="edge7" class="edge">
<title>web&#45;ui&#45;&gt;api&#45;backend</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M1042.94,-189.18C1059.78,-184.8 1076.75,-181.07 1093.29,-178.4 1215.22,-158.73 1249.15,-159.33 1371.18,-178.4 1390.87,-181.48 1411.2,-185.97 1431.21,-191.25"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="1042.54,-186.57 1035.98,-191.04 1043.9,-191.64 1042.54,-186.57"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1096.29,-181.4 1096.29,-221 1120.29,-221 1120.29,-181.4 1096.29,-181.4"/>
<text xml:space="preserve" text-anchor="start" x="1104.4" y="-198" font-family="Arial" font-weight="bold" font-size="14.00" fill="#c9c9c9">6</text>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1123.29,-181.4 1123.29,-221 1368.18,-221 1368.18,-181.4 1123.29,-181.4"/>
<text xml:space="preserve" text-anchor="start" x="1126.29" y="-204" font-family="Arial" font-size="14.00" fill="#c9c9c9">7. Confirmation: Pantry is now live and</text>
<text xml:space="preserve" text-anchor="start" x="1209.55" y="-187.2" font-family="Arial" font-size="14.00" fill="#c9c9c9">searchable!</text>
</g>
<!-- api&#45;backend&#45;&gt;intake&#45;agent -->
<g id="edge3" class="edge">
<title>api&#45;backend&#45;&gt;intake&#45;agent</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M1766.11,-251C1882.15,-251 2037.79,-251 2161.8,-251"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="2161.65,-253.63 2169.15,-251 2161.65,-248.38 2161.65,-253.63"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1829.44,-254 1829.44,-286.8 1853.44,-286.8 1853.44,-254 1829.44,-254"/>
<text xml:space="preserve" text-anchor="start" x="1837.54" y="-267.2" font-family="Arial" font-weight="bold" font-size="14.00" fill="#c9c9c9">2</text>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1856.44,-254 1856.44,-286.8 2109.12,-286.8 2109.12,-254 1856.44,-254"/>
<text xml:space="preserve" text-anchor="start" x="1859.44" y="-264.8" font-family="Arial" font-size="14.00" fill="#c9c9c9">3. Forward transcript to intake subagent</text>
</g>
<!-- intake&#45;agent&#45;&gt;gemini -->
<g id="edge4" class="edge">
<title>intake&#45;agent&#45;&gt;gemini</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M2566.52,-287.4C2694.64,-311.19 2860.25,-341.93 2982.53,-364.63"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="2981.91,-367.19 2989.77,-365.98 2982.87,-362.03 2981.91,-367.19"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="2629.75,-352.1 2629.75,-408.5 2653.75,-408.5 2653.75,-352.1 2629.75,-352.1"/>
<text xml:space="preserve" text-anchor="start" x="2637.85" y="-377.1" font-family="Arial" font-weight="bold" font-size="14.00" fill="#c9c9c9">3</text>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="2656.75,-352.1 2656.75,-408.5 2909.4,-408.5 2909.4,-352.1 2656.75,-352.1"/>
<text xml:space="preserve" text-anchor="start" x="2659.75" y="-391.5" font-family="Arial" font-size="14.00" fill="#c9c9c9">4. Extract structured capacity schema &amp;</text>
<text xml:space="preserve" text-anchor="start" x="2728.99" y="-374.7" font-family="Arial" font-size="14.00" fill="#c9c9c9">synthesize profile</text>
<text xml:space="preserve" text-anchor="start" x="2735.62" y="-357.9" font-family="Arial" font-size="14.00" fill="#c9c9c9">gRPC / HTTPS</text>
</g>
<!-- intake&#45;agent&#45;&gt;gemini -->
<g id="edge5" class="edge">
<title>intake&#45;agent&#45;&gt;gemini</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M2566.53,-211.63C2671.41,-198.36 2801.45,-194.56 2912.4,-229.4 2959.26,-244.12 3004.97,-271.64 3043.66,-300.13"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="3041.8,-302.02 3049.38,-304.41 3044.94,-297.81 3041.8,-302.02"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="2655.02,-232.4 2655.02,-272 2679.02,-272 2679.02,-232.4 2655.02,-232.4"/>
<text xml:space="preserve" text-anchor="start" x="2663.12" y="-249" font-family="Arial" font-weight="bold" font-size="14.00" fill="#c9c9c9">4</text>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="2682.02,-232.4 2682.02,-272 2884.13,-272 2884.13,-232.4 2682.02,-232.4"/>
<text xml:space="preserve" text-anchor="start" x="2685.02" y="-255" font-family="Arial" font-size="14.00" fill="#c9c9c9">5. Generate vector embeddings</text>
<text xml:space="preserve" text-anchor="start" x="2735.62" y="-238.2" font-family="Arial" font-size="14.00" fill="#c9c9c9">gRPC / HTTPS</text>
</g>
<!-- intake&#45;agent&#45;&gt;recipients&#45;data -->
<g id="edge6" class="edge">
<title>intake&#45;agent&#45;&gt;recipients&#45;data</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M2537.37,-161.12C2566.48,-148.56 2596.99,-137.28 2626.75,-129.4 2735.6,-100.56 2861.29,-90.36 2962.36,-87.54"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="2962.23,-90.16 2969.66,-87.35 2962.09,-84.92 2962.23,-90.16"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="2656.98,-132.4 2656.98,-172 2680.98,-172 2680.98,-132.4 2656.98,-132.4"/>
<text xml:space="preserve" text-anchor="start" x="2665.08" y="-149" font-family="Arial" font-weight="bold" font-size="14.00" fill="#c9c9c9">5</text>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="2683.98,-132.4 2683.98,-172 2882.17,-172 2882.17,-132.4 2683.98,-132.4"/>
<text xml:space="preserve" text-anchor="start" x="2686.98" y="-155" font-family="Arial" font-size="14.00" fill="#c9c9c9">6. Insert new recipient row with</text>
<text xml:space="preserve" text-anchor="start" x="2744.94" y="-138.2" font-family="Arial" font-size="14.00" fill="#c9c9c9">embeddings</text>
</g>
</g>
</svg>
`;case`production`:return`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
 "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<!-- Generated by graphviz version 16.1.0 (0)
 -->
<!-- Pages: 1 -->
<svg width="812pt" height="210pt"
 viewBox="0.00 0.00 812.00 210.00" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g id="graph0" class="graph" transform="scale(1 1) rotate(0) translate(15.05 195.05)">
<!-- gcp -->
<g id="node1" class="node">
<title>gcp</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="332.51,-180 0,-180 0,0 332.51,0 332.51,-180"/>
<text xml:space="preserve" text-anchor="start" x="65.1" y="-114" font-family="Arial" font-size="20.00" fill="#f8fafc">Google Cloud Platform</text>
<text xml:space="preserve" text-anchor="start" x="20.06" y="-90" font-family="Arial" font-size="20.00" fill="#f8fafc">(qwiklabs&#45;gcp&#45;04&#45;300332596f08)</text>
<text xml:space="preserve" text-anchor="start" x="23.26" y="-67" font-family="Arial" font-size="15.00" fill="#cbd5e1">Production infrastructure hosted on Google</text>
<text xml:space="preserve" text-anchor="start" x="114.57" y="-49" font-family="Arial" font-size="15.00" fill="#cbd5e1">Cloud Platform.</text>
</g>
<!-- devices -->
<g id="node2" class="node">
<title>devices</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="782.28,-180 462.24,-180 462.24,0 782.28,0 782.28,-180"/>
<text xml:space="preserve" text-anchor="start" x="542.23" y="-82" font-family="Arial" font-size="20.00" fill="#f8fafc">End User Devices</text>
</g>
</g>
</svg>
`;default:throw Error(`Unknown viewId: `+e)}};export{e as dotSource,t as svgSource};
var e=e=>{switch(e){case`index`:return`@startuml
title "System Context — Food Equity & Surplus Broker"
top to bottom direction

hide stereotype
skinparam ranksep 60
skinparam nodesep 30
skinparam {
  arrowFontSize 10
  defaultTextAlignment center
  wrapWidth 200
  maxMessageSize 100
  shadowing false
}

skinparam person<<Donor>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam person<<Coordinator>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam person<<Pantry>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam person<<Driver>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<Broker>>{
  BackgroundColor #3b82f6
  FontColor #eff6ff
  BorderColor #2563eb
}
skinparam rectangle<<Gemini>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<Openfda>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<ChicagoTraffic>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<OsmTiles>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
person "==Food Donor\\n\\nGrocers, restaurants, and farmers offering surplus food on tight expiration clocks." <<Donor>> as Donor
person "==Rescue Coordinator\\n\\nDispatchers overseeing food matching, resolving declines, and reviewing equity briefs." <<Coordinator>> as Coordinator
person "==Pantry Volunteer\\n\\nPantry coordinators and shelter operators receiving dispatches and onboarding capacity." <<Pantry>> as Pantry
person "==Delivery Driver\\n\\nVolunteer drivers picking up surplus from donor docks and delivering to pantries." <<Driver>> as Driver
rectangle "==Food Equity & Surplus Broker\\n\\nReal-time broker matching perishable surplus with verified community pantries under tight clocks." <<Broker>> as Broker
rectangle "==Google Gemini (Vertex AI)\\n<size:10>[Gemini 2.5/3.8 Flash, Vertex AI]</size>\\n\\nFoundation LLM providing multi-step reasoning, match-brief synthesis, and conversational intake." <<Gemini>> as Gemini
rectangle "==openFDA Food Safety API\\n<size:10>[REST API, api.fda.gov]</size>\\n\\nFederal enforcement feed screening surplus food for active recalls and undeclared allergens." <<Openfda>> as Openfda
rectangle "==City of Chicago Traffic Tracker\\n<size:10>[Civic Open Data API / OSRM]</size>\\n\\nLive congestion and arterial traffic speed feed for transit ETA calculations." <<ChicagoTraffic>> as ChicagoTraffic
rectangle "==OpenStreetMap Tile Service\\n<size:10>[Leaflet CDN]</size>\\n\\nMap tile provider rendering Chicago geospatial layers, tracts, and pantry pins." <<OsmTiles>> as OsmTiles

Donor .[#8D8D8D,thickness=2].> Broker : <color:#8D8D8D>Submits surplus offer with deadline clock
Coordinator .[#8D8D8D,thickness=2].> Broker : <color:#8D8D8D>Reviews match brief, inspects decoys, and triggers dispatches
Pantry .[#8D8D8D,thickness=2].> Broker : <color:#8D8D8D>Onboards new pantry via conversational interview
Driver .[#8D8D8D,thickness=2].> Broker : <color:#8D8D8D>Receives turn-by-turn routing and pickup alerts
Broker .[#8D8D8D,thickness=2].> Gemini : <color:#8D8D8D>[...]\\n<size:8>[<color:#8D8D8D>gRPC / HTTPS]</size>
Broker .[#8D8D8D,thickness=2].> Openfda : <color:#8D8D8D>Screens food description for active recalls\\n<size:8>[<color:#8D8D8D>HTTPS REST]</size>
Broker .[#8D8D8D,thickness=2].> ChicagoTraffic : <color:#8D8D8D>Retrieves live street congestion speeds\\n<size:8>[<color:#8D8D8D>HTTPS REST]</size>
Broker .[#8D8D8D,thickness=2].> OsmTiles : <color:#8D8D8D>Fetches Chicago map tiles\\n<size:8>[<color:#8D8D8D>HTTPS]</size>
@enduml
`;case`containers`:return`@startuml
title "Container Diagram — Broker Architecture"
top to bottom direction

hide stereotype
skinparam ranksep 60
skinparam nodesep 30
skinparam {
  arrowFontSize 10
  defaultTextAlignment center
  wrapWidth 200
  maxMessageSize 100
  shadowing false
}

skinparam person<<Donor>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam person<<Coordinator>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam person<<Pantry>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam person<<Driver>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<BrokerWebUi>>{
  BackgroundColor #6366f1
  FontColor #eef2ff
  BorderColor #4f46e5
}
skinparam rectangle<<BrokerApiBackend>>{
  BackgroundColor #6366f1
  FontColor #eef2ff
  BorderColor #4f46e5
}
skinparam rectangle<<OsmTiles>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<BrokerAgentEngine>>{
  BackgroundColor #6366f1
  FontColor #eef2ff
  BorderColor #4f46e5
}
skinparam rectangle<<BrokerLogisticsTools>>{
  BackgroundColor #6366f1
  FontColor #eef2ff
  BorderColor #4f46e5
}
skinparam rectangle<<BrokerMcpToolbox>>{
  BackgroundColor #6366f1
  FontColor #eef2ff
  BorderColor #4f46e5
}
skinparam rectangle<<Gemini>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<Openfda>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<ChicagoTraffic>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam database<<BrokerBigquery>>{
  BackgroundColor #3b82f6
  FontColor #eff6ff
  BorderColor #2563eb
}
person "==Food Donor\\n\\nGrocers, restaurants, and farmers offering surplus food on tight expiration clocks." <<Donor>> as Donor
person "==Rescue Coordinator\\n\\nDispatchers overseeing food matching, resolving declines, and reviewing equity briefs." <<Coordinator>> as Coordinator
person "==Pantry Volunteer\\n\\nPantry coordinators and shelter operators receiving dispatches and onboarding capacity." <<Pantry>> as Pantry
person "==Delivery Driver\\n\\nVolunteer drivers picking up surplus from donor docks and delivering to pantries." <<Driver>> as Driver
rectangle "Food Equity & Surplus Broker" <<Broker>> as Broker {
  skinparam RectangleBorderColor<<Broker>> #3b82f6
  skinparam RectangleFontColor<<Broker>> #3b82f6
  skinparam RectangleBorderStyle<<Broker>> dashed

  rectangle "==RescueDispatch Web Console\\n<size:10>[HTML5, Leaflet.js, CSS3]</size>\\n\\nInteractive console featuring 1-click scenarios, live Chicago map, 7-part match briefs, and smartphone SMS simulator." <<BrokerWebUi>> as BrokerWebUi
  rectangle "==FastAPI Dispatch Service\\n<size:10>[Python 3.11, FastAPI, Uvicorn]</size>\\n\\nREST API handling match requests, fallback cascading, live equity audits, and pantry onboarding." <<BrokerApiBackend>> as BrokerApiBackend
  rectangle "==ADK Agent Reasoning Engine\\n<size:10>[Google ADK, Python]</size>\\n\\nAutonomous reasoning layer orchestrating multi-step coordinator inquiries and onboarding." <<BrokerAgentEngine>> as BrokerAgentEngine
  rectangle "==Uber Logistics Tool Suite\\n<size:10>[Python 3.11]</size>\\n\\nDeterministic domain tools enforcing cold chain physics, safety margins, and spatial equity." <<BrokerLogisticsTools>> as BrokerLogisticsTools
  rectangle "==MCP Database Toolbox\\n<size:10>[Google Cloud MCP Toolbox for Databases]</size>\\n\\nGoogle-managed Model Context Protocol server exposing BigQuery schema and SQL query execution." <<BrokerMcpToolbox>> as BrokerMcpToolbox
  database "==BigQuery Warehouse & Vector Store\\n<size:10>[Google Cloud BigQuery (a4i_food dataset)]</size>\\n\\nAnalytical warehouse storing recipient profiles, census tracts, USDA shelf-life, and vector embeddings." <<BrokerBigquery>> as BrokerBigquery
}
rectangle "==OpenStreetMap Tile Service\\n<size:10>[Leaflet CDN]</size>\\n\\nMap tile provider rendering Chicago geospatial layers, tracts, and pantry pins." <<OsmTiles>> as OsmTiles
rectangle "==Google Gemini (Vertex AI)\\n<size:10>[Gemini 2.5/3.8 Flash, Vertex AI]</size>\\n\\nFoundation LLM providing multi-step reasoning, match-brief synthesis, and conversational intake." <<Gemini>> as Gemini
rectangle "==openFDA Food Safety API\\n<size:10>[REST API, api.fda.gov]</size>\\n\\nFederal enforcement feed screening surplus food for active recalls and undeclared allergens." <<Openfda>> as Openfda
rectangle "==City of Chicago Traffic Tracker\\n<size:10>[Civic Open Data API / OSRM]</size>\\n\\nLive congestion and arterial traffic speed feed for transit ETA calculations." <<ChicagoTraffic>> as ChicagoTraffic

Donor .[#8D8D8D,thickness=2].> BrokerWebUi : <color:#8D8D8D>Submits surplus offer with deadline clock
Coordinator .[#8D8D8D,thickness=2].> BrokerWebUi : <color:#8D8D8D>Reviews match brief, inspects decoys, and triggers dispatches
Pantry .[#8D8D8D,thickness=2].> BrokerWebUi : <color:#8D8D8D>Onboards new pantry via conversational interview
Driver .[#8D8D8D,thickness=2].> BrokerWebUi : <color:#8D8D8D>Receives turn-by-turn routing and pickup alerts
BrokerWebUi .[#8D8D8D,thickness=2].> BrokerApiBackend : <color:#8D8D8D>Sends match, cascade, and intake requests\\n<size:8>[<color:#8D8D8D>HTTPS / JSON REST]</size>
BrokerApiBackend .[#8D8D8D,thickness=2].> BrokerAgentEngine : <color:#8D8D8D>Dispatches coordinator queries and briefs
BrokerApiBackend .[#8D8D8D,thickness=2].> BrokerLogisticsTools : <color:#8D8D8D>Executes deterministic matching, clocks, and traffic tools
BrokerApiBackend .[#8D8D8D,thickness=2].> BrokerBigquery : <color:#8D8D8D>Queries demographic baselines and audits\\n<size:8>[<color:#8D8D8D>BigQuery Client SDK]</size>
BrokerAgentEngine .[#8D8D8D,thickness=2].> BrokerLogisticsTools : <color:#8D8D8D>Calls logistics and safety tools
BrokerAgentEngine .[#8D8D8D,thickness=2].> BrokerMcpToolbox : <color:#8D8D8D>Executes ad-hoc queries via MCP protocol\\n<size:8>[<color:#8D8D8D>MCP JSON-RPC]</size>
BrokerAgentEngine .[#8D8D8D,thickness=2].> BrokerBigquery : <color:#8D8D8D>Inserts new recipient record with embeddings
BrokerLogisticsTools .[#8D8D8D,thickness=2].> BrokerBigquery : <color:#8D8D8D>[...]
BrokerMcpToolbox .[#8D8D8D,thickness=2].> BrokerBigquery : <color:#8D8D8D>Introspects tables and runs ad-hoc SQL\\n<size:8>[<color:#8D8D8D>BigQuery API]</size>
BrokerWebUi .[#8D8D8D,thickness=2].> OsmTiles : <color:#8D8D8D>Fetches Chicago map tiles\\n<size:8>[<color:#8D8D8D>HTTPS]</size>
BrokerAgentEngine .[#8D8D8D,thickness=2].> Gemini : <color:#8D8D8D>[...]\\n<size:8>[<color:#8D8D8D>gRPC / HTTPS]</size>
BrokerLogisticsTools .[#8D8D8D,thickness=2].> Openfda : <color:#8D8D8D>Screens food description for active recalls\\n<size:8>[<color:#8D8D8D>HTTPS REST]</size>
BrokerLogisticsTools .[#8D8D8D,thickness=2].> ChicagoTraffic : <color:#8D8D8D>Retrieves live street congestion speeds\\n<size:8>[<color:#8D8D8D>HTTPS REST]</size>
@enduml
`;case`logistics`:return`@startuml
title "Component Diagram — Uber Logistics Tool Suite"
left to right direction

hide stereotype
skinparam ranksep 60
skinparam nodesep 30
skinparam {
  arrowFontSize 10
  defaultTextAlignment center
  wrapWidth 200
  maxMessageSize 100
  shadowing false
}

skinparam component<<BrokerLogisticsToolsClockCalc>>{
  BackgroundColor #0284c7
  FontColor #f0f9ff
  BorderColor #0369a1
}
skinparam component<<BrokerLogisticsToolsMatcher>>{
  BackgroundColor #0284c7
  FontColor #f0f9ff
  BorderColor #0369a1
}
skinparam component<<BrokerLogisticsToolsCascadingDispatcher>>{
  BackgroundColor #0284c7
  FontColor #f0f9ff
  BorderColor #0369a1
}
skinparam component<<BrokerLogisticsToolsLoadSplitter>>{
  BackgroundColor #0284c7
  FontColor #f0f9ff
  BorderColor #0369a1
}
skinparam component<<BrokerLogisticsToolsRecallChecker>>{
  BackgroundColor #0284c7
  FontColor #f0f9ff
  BorderColor #0369a1
}
skinparam component<<BrokerLogisticsToolsTrafficRouter>>{
  BackgroundColor #0284c7
  FontColor #f0f9ff
  BorderColor #0369a1
}
skinparam component<<BrokerLogisticsToolsEquityAuditor>>{
  BackgroundColor #0284c7
  FontColor #f0f9ff
  BorderColor #0369a1
}
skinparam rectangle<<Openfda>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<ChicagoTraffic>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam database<<BrokerBigquery>>{
  BackgroundColor #3b82f6
  FontColor #eff6ff
  BorderColor #2563eb
}
rectangle "Uber Logistics Tool Suite" <<BrokerLogisticsTools>> as BrokerLogisticsTools {
  skinparam RectangleBorderColor<<BrokerLogisticsTools>> #6366f1
  skinparam RectangleFontColor<<BrokerLogisticsTools>> #6366f1
  skinparam RectangleBorderStyle<<BrokerLogisticsTools>> dashed

  component "==Shelf-Life Clock Calculator\\n<size:10>[Python]</size>\\n\\nCalculates effective pickup window from USDA shelf-life references and donor deadlines." <<BrokerLogisticsToolsClockCalc>> as BrokerLogisticsToolsClockCalc
  component "==Constraint Filter & Tie-Breaker\\n<size:10>[Python]</size>\\n\\nHard-filters cold-chain decoys and contradictions, then breaks ties on vehicle-insecurity and poverty rates." <<BrokerLogisticsToolsMatcher>> as BrokerLogisticsToolsMatcher
  component "==Cascading Dispatch Engine\\n<size:10>[Python]</size>\\n\\nGenerates tailored dispatch alerts and instantly shifts to backup pantries if primary declines." <<BrokerLogisticsToolsCascadingDispatcher>> as BrokerLogisticsToolsCascadingDispatcher
  component "==Multi-Pantry Bulk Partitioning\\n<size:10>[Python]</size>\\n\\nPartitions massive agricultural donations across multiple pantries when exceeding single capacity." <<BrokerLogisticsToolsLoadSplitter>> as BrokerLogisticsToolsLoadSplitter
  component "==Food Safety Recall Guardrail\\n<size:10>[Python]</size>\\n\\nQueries openFDA to halt or flag postings subject to active food recall notices." <<BrokerLogisticsToolsRecallChecker>> as BrokerLogisticsToolsRecallChecker
  component "==Chicago Traffic & Route Router\\n<size:10>[Python]</size>\\n\\nComputes real-time driving duration, congestion delay, and safety margins." <<BrokerLogisticsToolsTrafficRouter>> as BrokerLogisticsToolsTrafficRouter
  component "==Spatial Equity Auditor\\n<size:10>[Python]</size>\\n\\nMeasures demographic lift against metro baselines and uncovers cold-chain rescue deserts." <<BrokerLogisticsToolsEquityAuditor>> as BrokerLogisticsToolsEquityAuditor
}
rectangle "==openFDA Food Safety API\\n<size:10>[REST API, api.fda.gov]</size>\\n\\nFederal enforcement feed screening surplus food for active recalls and undeclared allergens." <<Openfda>> as Openfda
rectangle "==City of Chicago Traffic Tracker\\n<size:10>[Civic Open Data API / OSRM]</size>\\n\\nLive congestion and arterial traffic speed feed for transit ETA calculations." <<ChicagoTraffic>> as ChicagoTraffic
database "==BigQuery Warehouse & Vector Store\\n<size:10>[Google Cloud BigQuery (a4i_food dataset)]</size>\\n\\nAnalytical warehouse storing recipient profiles, census tracts, USDA shelf-life, and vector embeddings." <<BrokerBigquery>> as BrokerBigquery

BrokerLogisticsToolsClockCalc .[#8D8D8D,thickness=2].> BrokerBigquery : <color:#8D8D8D>Reads shelf-life reference hours
BrokerLogisticsToolsMatcher .[#8D8D8D,thickness=2].> BrokerBigquery : <color:#8D8D8D>[...]
BrokerLogisticsToolsRecallChecker .[#8D8D8D,thickness=2].> Openfda : <color:#8D8D8D>Screens food description for active recalls\\n<size:8>[<color:#8D8D8D>HTTPS REST]</size>
BrokerLogisticsToolsTrafficRouter .[#8D8D8D,thickness=2].> ChicagoTraffic : <color:#8D8D8D>Retrieves live street congestion speeds\\n<size:8>[<color:#8D8D8D>HTTPS REST]</size>
BrokerLogisticsToolsEquityAuditor .[#8D8D8D,thickness=2].> BrokerBigquery : <color:#8D8D8D>Audits spatial distribution and gaps
@enduml
`;case`data-layer`:return`@startuml
title "Component Diagram — BigQuery Warehouse & Vector Store"
top to bottom direction

hide stereotype
skinparam ranksep 60
skinparam nodesep 30
skinparam {
  arrowFontSize 10
  defaultTextAlignment center
  wrapWidth 200
  maxMessageSize 100
  shadowing false
}

skinparam rectangle<<BrokerAgentEngine>>{
  BackgroundColor #6366f1
  FontColor #eef2ff
  BorderColor #4f46e5
}
skinparam rectangle<<BrokerLogisticsTools>>{
  BackgroundColor #6366f1
  FontColor #eef2ff
  BorderColor #4f46e5
}
skinparam component<<BrokerBigqueryRecipientsData>>{
  BackgroundColor #0284c7
  FontColor #f0f9ff
  BorderColor #0369a1
}
skinparam component<<BrokerBigqueryShelfLifeData>>{
  BackgroundColor #0284c7
  FontColor #f0f9ff
  BorderColor #0369a1
}
skinparam component<<BrokerBigqueryTractDemographics>>{
  BackgroundColor #0284c7
  FontColor #f0f9ff
  BorderColor #0369a1
}
skinparam component<<BrokerBigqueryVectorIndex>>{
  BackgroundColor #0284c7
  FontColor #f0f9ff
  BorderColor #0369a1
}
skinparam component<<BrokerBigqueryRescueDeserts>>{
  BackgroundColor #0284c7
  FontColor #f0f9ff
  BorderColor #0369a1
}
rectangle "==ADK Agent Reasoning Engine\\n<size:10>[Google ADK, Python]</size>\\n\\nAutonomous reasoning layer orchestrating multi-step coordinator inquiries and onboarding." <<BrokerAgentEngine>> as BrokerAgentEngine
rectangle "==Uber Logistics Tool Suite\\n<size:10>[Python 3.11]</size>\\n\\nDeterministic domain tools enforcing cold chain physics, safety margins, and spatial equity." <<BrokerLogisticsTools>> as BrokerLogisticsTools
rectangle "BigQuery Warehouse & Vector Store" <<BrokerBigquery>> as BrokerBigquery {
  skinparam RectangleBorderColor<<BrokerBigquery>> #3b82f6
  skinparam RectangleFontColor<<BrokerBigquery>> #3b82f6
  skinparam RectangleBorderStyle<<BrokerBigquery>> dashed

  component "==Recipients & Capacities Table\\n<size:10>[BigQuery Table]</size>\\n\\nStores organizations, walk-in cold storage capacity, pickup windows, and embedding vectors." <<BrokerBigqueryRecipientsData>> as BrokerBigqueryRecipientsData
  component "==USDA Shelf-Life Catalog\\n<size:10>[BigQuery Table]</size>\\n\\nStandard perishable and pantry food storage guidelines and maximum viable hours." <<BrokerBigqueryShelfLifeData>> as BrokerBigqueryShelfLifeData
  component "==Census Tract Demographics\\n<size:10>[BigQuery Table & Spatial Polygons]</size>\\n\\nCook County tract demographic metrics (poverty rate, zero-vehicle percentage, internal centroids)." <<BrokerBigqueryTractDemographics>> as BrokerBigqueryTractDemographics
  component "==BigQuery Vector Search Engine\\n<size:10>[VECTOR_SEARCH, gemini-embedding-2]</size>\\n\\nCosine distance semantic search identifying matching pantries from donor natural language postings." <<BrokerBigqueryVectorIndex>> as BrokerBigqueryVectorIndex
  component "==Rescue Deserts Spatial View\\n<size:10>[BigQuery View]</size>\\n\\nIdentifies tracts with >30% poverty and >40% no-vehicle rates having 0 cold-storage pantries within 5km." <<BrokerBigqueryRescueDeserts>> as BrokerBigqueryRescueDeserts
}

BrokerAgentEngine .[#8D8D8D,thickness=2].> BrokerBigqueryRecipientsData : <color:#8D8D8D>Inserts new recipient record with embeddings
BrokerLogisticsTools .[#8D8D8D,thickness=2].> BrokerBigqueryRecipientsData : <color:#8D8D8D>Filters by cold storage & capacity
BrokerLogisticsTools .[#8D8D8D,thickness=2].> BrokerBigqueryShelfLifeData : <color:#8D8D8D>Reads shelf-life reference hours
BrokerLogisticsTools .[#8D8D8D,thickness=2].> BrokerBigqueryTractDemographics : <color:#8D8D8D>Enriches with poverty & vehicle stats
BrokerLogisticsTools .[#8D8D8D,thickness=2].> BrokerBigqueryVectorIndex : <color:#8D8D8D>Runs VECTOR_SEARCH on donor description
BrokerLogisticsTools .[#8D8D8D,thickness=2].> BrokerBigqueryRescueDeserts : <color:#8D8D8D>Audits spatial distribution and gaps
@enduml
`;case`spinach-rescue-flow`:return`@startuml
title "Dynamic Flow — 6-Hour Perishable Spinach Dispatch & Cascade"
left to right direction

hide stereotype
skinparam ranksep 60
skinparam nodesep 30
skinparam {
  arrowFontSize 10
  defaultTextAlignment center
  wrapWidth 200
  maxMessageSize 100
  shadowing false
}

skinparam person<<Donor>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam person<<Coordinator>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<BrokerWebUi>>{
  BackgroundColor #6366f1
  FontColor #eef2ff
  BorderColor #4f46e5
}
skinparam rectangle<<BrokerApiBackend>>{
  BackgroundColor #6366f1
  FontColor #eef2ff
  BorderColor #4f46e5
}
skinparam component<<BrokerLogisticsToolsClockCalc>>{
  BackgroundColor #0284c7
  FontColor #f0f9ff
  BorderColor #0369a1
}
skinparam component<<BrokerBigqueryShelfLifeData>>{
  BackgroundColor #0284c7
  FontColor #f0f9ff
  BorderColor #0369a1
}
skinparam component<<BrokerLogisticsToolsRecallChecker>>{
  BackgroundColor #0284c7
  FontColor #f0f9ff
  BorderColor #0369a1
}
skinparam rectangle<<Openfda>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam component<<BrokerLogisticsToolsMatcher>>{
  BackgroundColor #0284c7
  FontColor #f0f9ff
  BorderColor #0369a1
}
skinparam component<<BrokerBigqueryVectorIndex>>{
  BackgroundColor #0284c7
  FontColor #f0f9ff
  BorderColor #0369a1
}
skinparam component<<BrokerBigqueryRecipientsData>>{
  BackgroundColor #0284c7
  FontColor #f0f9ff
  BorderColor #0369a1
}
skinparam component<<BrokerBigqueryTractDemographics>>{
  BackgroundColor #0284c7
  FontColor #f0f9ff
  BorderColor #0369a1
}
skinparam component<<BrokerLogisticsToolsTrafficRouter>>{
  BackgroundColor #0284c7
  FontColor #f0f9ff
  BorderColor #0369a1
}
skinparam rectangle<<ChicagoTraffic>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam component<<BrokerAgentEngineBrokerAgent>>{
  BackgroundColor #0284c7
  FontColor #f0f9ff
  BorderColor #0369a1
}
skinparam rectangle<<Gemini>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam component<<BrokerLogisticsToolsCascadingDispatcher>>{
  BackgroundColor #0284c7
  FontColor #f0f9ff
  BorderColor #0369a1
}
person "==Food Donor\\n\\nGrocers, restaurants, and farmers offering surplus food on tight expiration clocks." <<Donor>> as Donor
person "==Rescue Coordinator\\n\\nDispatchers overseeing food matching, resolving declines, and reviewing equity briefs." <<Coordinator>> as Coordinator
rectangle "==RescueDispatch Web Console\\n<size:10>[HTML5, Leaflet.js, CSS3]</size>\\n\\nInteractive console featuring 1-click scenarios, live Chicago map, 7-part match briefs, and smartphone SMS simulator." <<BrokerWebUi>> as BrokerWebUi
rectangle "==FastAPI Dispatch Service\\n<size:10>[Python 3.11, FastAPI, Uvicorn]</size>\\n\\nREST API handling match requests, fallback cascading, live equity audits, and pantry onboarding." <<BrokerApiBackend>> as BrokerApiBackend
component "==Shelf-Life Clock Calculator\\n<size:10>[Python]</size>\\n\\nCalculates effective pickup window from USDA shelf-life references and donor deadlines." <<BrokerLogisticsToolsClockCalc>> as BrokerLogisticsToolsClockCalc
component "==USDA Shelf-Life Catalog\\n<size:10>[BigQuery Table]</size>\\n\\nStandard perishable and pantry food storage guidelines and maximum viable hours." <<BrokerBigqueryShelfLifeData>> as BrokerBigqueryShelfLifeData
component "==Food Safety Recall Guardrail\\n<size:10>[Python]</size>\\n\\nQueries openFDA to halt or flag postings subject to active food recall notices." <<BrokerLogisticsToolsRecallChecker>> as BrokerLogisticsToolsRecallChecker
rectangle "==openFDA Food Safety API\\n<size:10>[REST API, api.fda.gov]</size>\\n\\nFederal enforcement feed screening surplus food for active recalls and undeclared allergens." <<Openfda>> as Openfda
component "==Constraint Filter & Tie-Breaker\\n<size:10>[Python]</size>\\n\\nHard-filters cold-chain decoys and contradictions, then breaks ties on vehicle-insecurity and poverty rates." <<BrokerLogisticsToolsMatcher>> as BrokerLogisticsToolsMatcher
component "==BigQuery Vector Search Engine\\n<size:10>[VECTOR_SEARCH, gemini-embedding-2]</size>\\n\\nCosine distance semantic search identifying matching pantries from donor natural language postings." <<BrokerBigqueryVectorIndex>> as BrokerBigqueryVectorIndex
component "==Recipients & Capacities Table\\n<size:10>[BigQuery Table]</size>\\n\\nStores organizations, walk-in cold storage capacity, pickup windows, and embedding vectors." <<BrokerBigqueryRecipientsData>> as BrokerBigqueryRecipientsData
component "==Census Tract Demographics\\n<size:10>[BigQuery Table & Spatial Polygons]</size>\\n\\nCook County tract demographic metrics (poverty rate, zero-vehicle percentage, internal centroids)." <<BrokerBigqueryTractDemographics>> as BrokerBigqueryTractDemographics
component "==Chicago Traffic & Route Router\\n<size:10>[Python]</size>\\n\\nComputes real-time driving duration, congestion delay, and safety margins." <<BrokerLogisticsToolsTrafficRouter>> as BrokerLogisticsToolsTrafficRouter
rectangle "==City of Chicago Traffic Tracker\\n<size:10>[Civic Open Data API / OSRM]</size>\\n\\nLive congestion and arterial traffic speed feed for transit ETA calculations." <<ChicagoTraffic>> as ChicagoTraffic
component "==Surplus Broker Root Agent\\n<size:10>[Google ADK, Gemini 2.5 Flash]</size>\\n\\nEvaluates offers, invokes logistics tools, weighs trade-offs, and synthesizes 7-part match briefs." <<BrokerAgentEngineBrokerAgent>> as BrokerAgentEngineBrokerAgent
rectangle "==Google Gemini (Vertex AI)\\n<size:10>[Gemini 2.5/3.8 Flash, Vertex AI]</size>\\n\\nFoundation LLM providing multi-step reasoning, match-brief synthesis, and conversational intake." <<Gemini>> as Gemini
component "==Cascading Dispatch Engine\\n<size:10>[Python]</size>\\n\\nGenerates tailored dispatch alerts and instantly shifts to backup pantries if primary declines." <<BrokerLogisticsToolsCascadingDispatcher>> as BrokerLogisticsToolsCascadingDispatcher

Donor .[#8D8D8D,thickness=2].> BrokerWebUi : <color:#8D8D8D>1. Submits 10 crates spinach with 6-hour deadline
BrokerWebUi .[#8D8D8D,thickness=2].> BrokerApiBackend : <color:#8D8D8D>2. POST /api/match\\n<size:8>[<color:#8D8D8D>HTTPS / JSON REST]</size>
BrokerApiBackend .[#8D8D8D,thickness=2].> BrokerLogisticsToolsClockCalc : <color:#8D8D8D>3. Calculate effective shelf-life window
BrokerLogisticsToolsClockCalc .[#8D8D8D,thickness=2].> BrokerBigqueryShelfLifeData : <color:#8D8D8D>4. Lookup spinach USDA shelf life
BrokerApiBackend .[#8D8D8D,thickness=2].> BrokerLogisticsToolsRecallChecker : <color:#8D8D8D>5. Screen for active FDA recalls
BrokerLogisticsToolsRecallChecker .[#8D8D8D,thickness=2].> Openfda : <color:#8D8D8D>6. Query food recall API\\n<size:8>[<color:#8D8D8D>HTTPS REST]</size>
BrokerApiBackend .[#8D8D8D,thickness=2].> BrokerLogisticsToolsMatcher : <color:#8D8D8D>7. Find and rank qualified pantries
BrokerLogisticsToolsMatcher .[#8D8D8D,thickness=2].> BrokerBigqueryVectorIndex : <color:#8D8D8D>8. Run VECTOR_SEARCH on profile text
BrokerLogisticsToolsMatcher .[#8D8D8D,thickness=2].> BrokerBigqueryRecipientsData : <color:#8D8D8D>9. Check cold storage & capacity
BrokerLogisticsToolsMatcher .[#8D8D8D,thickness=2].> BrokerLogisticsToolsMatcher : <color:#8D8D8D>10. Hard-filter Greenline decoy (No cold storage)
BrokerLogisticsToolsMatcher .[#8D8D8D,thickness=2].> BrokerBigqueryTractDemographics : <color:#8D8D8D>11. Enrich with tract vehicle-insecurity %
BrokerApiBackend .[#8D8D8D,thickness=2].> BrokerLogisticsToolsTrafficRouter : <color:#8D8D8D>12. Compute route driving time and congestion delay
BrokerLogisticsToolsTrafficRouter .[#8D8D8D,thickness=2].> ChicagoTraffic : <color:#8D8D8D>13. Query Chicago live traffic speeds\\n<size:8>[<color:#8D8D8D>HTTPS REST]</size>
BrokerApiBackend .[#8D8D8D,thickness=2].> BrokerAgentEngineBrokerAgent : <color:#8D8D8D>14. Synthesize 7-Part Match Brief
BrokerAgentEngineBrokerAgent .[#8D8D8D,thickness=2].> Gemini : <color:#8D8D8D>15. Generate reasoned explanation and driver SMS\\n<size:8>[<color:#8D8D8D>gRPC / HTTPS]</size>
BrokerApiBackend .[#8D8D8D,thickness=2].> BrokerWebUi : <color:#8D8D8D>16. Render Match Card, Leaflet Map pins, and Decoy explanation
Coordinator .[#8D8D8D,thickness=2].> BrokerWebUi : <color:#8D8D8D>17. Primary pantry declines offer: clicks [They said no]
BrokerWebUi .[#8D8D8D,thickness=2].> BrokerApiBackend : <color:#8D8D8D>18. POST /api/dispatch-fallback\\n<size:8>[<color:#8D8D8D>HTTPS / JSON REST]</size>
BrokerApiBackend .[#8D8D8D,thickness=2].> BrokerLogisticsToolsCascadingDispatcher : <color:#8D8D8D>19. Promote Backup #2 to primary
BrokerApiBackend .[#8D8D8D,thickness=2].> BrokerWebUi : <color:#8D8D8D>20. Instant re-dispatch with updated SMS alert
@enduml
`;case`pantry-onboarding-flow`:return`@startuml
title "Dynamic Flow — Conversational Pantry Intake & Onboarding"
left to right direction

hide stereotype
skinparam ranksep 60
skinparam nodesep 30
skinparam {
  arrowFontSize 10
  defaultTextAlignment center
  wrapWidth 200
  maxMessageSize 100
  shadowing false
}

skinparam person<<Pantry>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<BrokerWebUi>>{
  BackgroundColor #6366f1
  FontColor #eef2ff
  BorderColor #4f46e5
}
skinparam rectangle<<BrokerApiBackend>>{
  BackgroundColor #6366f1
  FontColor #eef2ff
  BorderColor #4f46e5
}
skinparam component<<BrokerAgentEngineIntakeAgent>>{
  BackgroundColor #0284c7
  FontColor #f0f9ff
  BorderColor #0369a1
}
skinparam rectangle<<Gemini>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam component<<BrokerBigqueryRecipientsData>>{
  BackgroundColor #0284c7
  FontColor #f0f9ff
  BorderColor #0369a1
}
person "==Pantry Volunteer\\n\\nPantry coordinators and shelter operators receiving dispatches and onboarding capacity." <<Pantry>> as Pantry
rectangle "==RescueDispatch Web Console\\n<size:10>[HTML5, Leaflet.js, CSS3]</size>\\n\\nInteractive console featuring 1-click scenarios, live Chicago map, 7-part match briefs, and smartphone SMS simulator." <<BrokerWebUi>> as BrokerWebUi
rectangle "==FastAPI Dispatch Service\\n<size:10>[Python 3.11, FastAPI, Uvicorn]</size>\\n\\nREST API handling match requests, fallback cascading, live equity audits, and pantry onboarding." <<BrokerApiBackend>> as BrokerApiBackend
component "==Conversational Pantry Intake Agent\\n<size:10>[Conversational Subagent]</size>\\n\\nInterviews new pantry coordinators, extracts capacity schemas, and generates profile texts." <<BrokerAgentEngineIntakeAgent>> as BrokerAgentEngineIntakeAgent
rectangle "==Google Gemini (Vertex AI)\\n<size:10>[Gemini 2.5/3.8 Flash, Vertex AI]</size>\\n\\nFoundation LLM providing multi-step reasoning, match-brief synthesis, and conversational intake." <<Gemini>> as Gemini
component "==Recipients & Capacities Table\\n<size:10>[BigQuery Table]</size>\\n\\nStores organizations, walk-in cold storage capacity, pickup windows, and embedding vectors." <<BrokerBigqueryRecipientsData>> as BrokerBigqueryRecipientsData

Pantry .[#8D8D8D,thickness=2].> BrokerWebUi : <color:#8D8D8D>1. Enters pantry details in conversational onboarding modal
BrokerWebUi .[#8D8D8D,thickness=2].> BrokerApiBackend : <color:#8D8D8D>2. POST /api/intake\\n<size:8>[<color:#8D8D8D>HTTPS / JSON REST]</size>
BrokerApiBackend .[#8D8D8D,thickness=2].> BrokerAgentEngineIntakeAgent : <color:#8D8D8D>3. Forward transcript to intake subagent
BrokerAgentEngineIntakeAgent .[#8D8D8D,thickness=2].> Gemini : <color:#8D8D8D>4. Extract structured capacity schema & synthesize profile\\n<size:8>[<color:#8D8D8D>gRPC / HTTPS]</size>
BrokerAgentEngineIntakeAgent .[#8D8D8D,thickness=2].> Gemini : <color:#8D8D8D>5. Generate vector embeddings\\n<size:8>[<color:#8D8D8D>gRPC / HTTPS]</size>
BrokerAgentEngineIntakeAgent .[#8D8D8D,thickness=2].> BrokerBigqueryRecipientsData : <color:#8D8D8D>6. Insert new recipient row with embeddings
BrokerApiBackend .[#8D8D8D,thickness=2].> BrokerWebUi : <color:#8D8D8D>7. Confirmation: Pantry is now live and searchable!
@enduml
`;case`production`:return`@startuml
title "Deployment Diagram — Google Cloud Platform Production"
top to bottom direction

hide stereotype
skinparam ranksep 60
skinparam nodesep 30
skinparam {
  arrowFontSize 10
  defaultTextAlignment center
  wrapWidth 200
  maxMessageSize 100
  shadowing false
}

skinparam rectangle<<Gcp>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<Devices>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
rectangle "==Google Cloud Platform (qwiklabs-gcp-04-300332596f08)\\n\\nProduction infrastructure hosted on Google Cloud Platform." <<Gcp>> as Gcp
rectangle "==End User Devices" <<Devices>> as Devices
@enduml
`;default:throw Error(`Unknown viewId: `+e)}};export{e as pumlSource};
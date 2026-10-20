var e=e=>{switch(e){case`index`:return`---
title: "System Context — Food Equity & Surplus Broker"
---
graph TB
  Donor@{ icon: "fa:user", shape: rounded, label: "Food Donor" }
  Coordinator@{ icon: "fa:user", shape: rounded, label: "Rescue Coordinator" }
  Pantry@{ icon: "fa:user", shape: rounded, label: "Pantry Volunteer" }
  Driver@{ icon: "fa:user", shape: rounded, label: "Delivery Driver" }
  Broker@{ shape: rectangle, label: "Food Equity & Surplus Broker" }
  Gemini@{ shape: rectangle, label: "Google Gemini (Vertex AI)" }
  Openfda@{ shape: rectangle, label: "openFDA Food Safety API" }
  Chicago_traffic@{ shape: rectangle, label: "City of Chicago Traffic Tracker" }
  Osm_tiles@{ shape: rectangle, label: "OpenStreetMap Tile Service" }
  Donor -. "\`Submits surplus offer with deadline clock\`" .-> Broker
  Coordinator -. "\`Reviews match brief, inspects decoys, and triggers dispatches\`" .-> Broker
  Pantry -. "\`Onboards new pantry via conversational interview\`" .-> Broker
  Driver -. "\`Receives turn-by-turn routing and pickup alerts\`" .-> Broker
  Broker -. "\`[...]\`" .-> Gemini
  Broker -. "\`Screens food description for active recalls\`" .-> Openfda
  Broker -. "\`Retrieves live street congestion speeds\`" .-> Chicago_traffic
  Broker -. "\`Fetches Chicago map tiles\`" .-> Osm_tiles
`;case`containers`:return`---
title: "Container Diagram — Broker Architecture"
---
graph TB
  Donor@{ icon: "fa:user", shape: rounded, label: "Food Donor" }
  Coordinator@{ icon: "fa:user", shape: rounded, label: "Rescue Coordinator" }
  Pantry@{ icon: "fa:user", shape: rounded, label: "Pantry Volunteer" }
  Driver@{ icon: "fa:user", shape: rounded, label: "Delivery Driver" }
  subgraph Broker["\`Food Equity & Surplus Broker\`"]
    Broker.Web_ui@{ shape: rectangle, label: "RescueDispatch Web Console" }
    Broker.Api_backend@{ shape: rectangle, label: "FastAPI Dispatch Service" }
    Broker.Agent_engine@{ shape: rectangle, label: "ADK Agent Reasoning Engine" }
    Broker.Logistics_tools@{ shape: rectangle, label: "Uber Logistics Tool Suite" }
    Broker.Mcp_toolbox@{ shape: rectangle, label: "MCP Database Toolbox" }
    Broker.Bigquery@{ shape: disk, label: "BigQuery Warehouse & Vector Store" }
  end
  Osm_tiles@{ shape: rectangle, label: "OpenStreetMap Tile Service" }
  Gemini@{ shape: rectangle, label: "Google Gemini (Vertex AI)" }
  Openfda@{ shape: rectangle, label: "openFDA Food Safety API" }
  Chicago_traffic@{ shape: rectangle, label: "City of Chicago Traffic Tracker" }
  Donor -. "\`Submits surplus offer with deadline clock\`" .-> Broker.Web_ui
  Coordinator -. "\`Reviews match brief, inspects decoys, and triggers dispatches\`" .-> Broker.Web_ui
  Pantry -. "\`Onboards new pantry via conversational interview\`" .-> Broker.Web_ui
  Driver -. "\`Receives turn-by-turn routing and pickup alerts\`" .-> Broker.Web_ui
  Broker.Web_ui -. "\`Sends match, cascade, and intake requests\`" .-> Broker.Api_backend
  Broker.Api_backend -. "\`Dispatches coordinator queries and briefs\`" .-> Broker.Agent_engine
  Broker.Api_backend -. "\`Executes deterministic matching, clocks, and traffic tools\`" .-> Broker.Logistics_tools
  Broker.Api_backend -. "\`Queries demographic baselines and audits\`" .-> Broker.Bigquery
  Broker.Agent_engine -. "\`Calls logistics and safety tools\`" .-> Broker.Logistics_tools
  Broker.Agent_engine -. "\`Executes ad-hoc queries via MCP protocol\`" .-> Broker.Mcp_toolbox
  Broker.Agent_engine -. "\`Inserts new recipient record with embeddings\`" .-> Broker.Bigquery
  Broker.Logistics_tools -. "\`[...]\`" .-> Broker.Bigquery
  Broker.Mcp_toolbox -. "\`Introspects tables and runs ad-hoc SQL\`" .-> Broker.Bigquery
  Broker.Web_ui -. "\`Fetches Chicago map tiles\`" .-> Osm_tiles
  Broker.Agent_engine -. "\`[...]\`" .-> Gemini
  Broker.Logistics_tools -. "\`Screens food description for active recalls\`" .-> Openfda
  Broker.Logistics_tools -. "\`Retrieves live street congestion speeds\`" .-> Chicago_traffic
`;case`logistics`:return`---
title: "Component Diagram — Uber Logistics Tool Suite"
---
graph LR
  subgraph BrokerLogistics_tools["\`Uber Logistics Tool Suite\`"]
    BrokerLogistics_tools.Clock_calc@{ shape: rectangle, label: "Shelf-Life Clock Calculator" }
    BrokerLogistics_tools.Matcher@{ shape: rectangle, label: "Constraint Filter & Tie-Breaker" }
    BrokerLogistics_tools.Cascading_dispatcher@{ shape: rectangle, label: "Cascading Dispatch Engine" }
    BrokerLogistics_tools.Load_splitter@{ shape: rectangle, label: "Multi-Pantry Bulk Partitioning" }
    BrokerLogistics_tools.Recall_checker@{ shape: rectangle, label: "Food Safety Recall Guardrail" }
    BrokerLogistics_tools.Traffic_router@{ shape: rectangle, label: "Chicago Traffic & Route Router" }
    BrokerLogistics_tools.Equity_auditor@{ shape: rectangle, label: "Spatial Equity Auditor" }
  end
  Openfda@{ shape: rectangle, label: "openFDA Food Safety API" }
  Chicago_traffic@{ shape: rectangle, label: "City of Chicago Traffic Tracker" }
  BrokerBigquery@{ shape: disk, label: "BigQuery Warehouse & Vector Store" }
  BrokerLogistics_tools.Clock_calc -. "\`Reads shelf-life reference hours\`" .-> BrokerBigquery
  BrokerLogistics_tools.Matcher -. "\`[...]\`" .-> BrokerBigquery
  BrokerLogistics_tools.Recall_checker -. "\`Screens food description for active recalls\`" .-> Openfda
  BrokerLogistics_tools.Traffic_router -. "\`Retrieves live street congestion speeds\`" .-> Chicago_traffic
  BrokerLogistics_tools.Equity_auditor -. "\`Audits spatial distribution and gaps\`" .-> BrokerBigquery
`;case`data-layer`:return`---
title: "Component Diagram — BigQuery Warehouse & Vector Store"
---
graph TB
  BrokerAgent_engine@{ shape: rectangle, label: "ADK Agent Reasoning Engine" }
  BrokerLogistics_tools@{ shape: rectangle, label: "Uber Logistics Tool Suite" }
  subgraph BrokerBigquery["\`BigQuery Warehouse & Vector Store\`"]
    BrokerBigquery.Recipients_data@{ shape: rectangle, label: "Recipients & Capacities Table" }
    BrokerBigquery.Shelf_life_data@{ shape: rectangle, label: "USDA Shelf-Life Catalog" }
    BrokerBigquery.Tract_demographics@{ shape: rectangle, label: "Census Tract Demographics" }
    BrokerBigquery.Vector_index@{ shape: rectangle, label: "BigQuery Vector Search Engine" }
    BrokerBigquery.Rescue_deserts@{ shape: rectangle, label: "Rescue Deserts Spatial View" }
  end
  BrokerAgent_engine -. "\`Inserts new recipient record with embeddings\`" .-> BrokerBigquery.Recipients_data
  BrokerLogistics_tools -. "\`Filters by cold storage & capacity\`" .-> BrokerBigquery.Recipients_data
  BrokerLogistics_tools -. "\`Reads shelf-life reference hours\`" .-> BrokerBigquery.Shelf_life_data
  BrokerLogistics_tools -. "\`Enriches with poverty & vehicle stats\`" .-> BrokerBigquery.Tract_demographics
  BrokerLogistics_tools -. "\`Runs VECTOR_SEARCH on donor description\`" .-> BrokerBigquery.Vector_index
  BrokerLogistics_tools -. "\`Audits spatial distribution and gaps\`" .-> BrokerBigquery.Rescue_deserts
`;case`spinach-rescue-flow`:return`---
title: "Dynamic Flow — 6-Hour Perishable Spinach Dispatch & Cascade"
---
graph LR
  Donor@{ icon: "fa:user", shape: rounded, label: "Food Donor" }
  Coordinator@{ icon: "fa:user", shape: rounded, label: "Rescue Coordinator" }
  BrokerWeb_ui@{ shape: rectangle, label: "RescueDispatch Web Console" }
  BrokerApi_backend@{ shape: rectangle, label: "FastAPI Dispatch Service" }
  BrokerLogistics_toolsClock_calc@{ shape: rectangle, label: "Shelf-Life Clock Calculator" }
  BrokerBigqueryShelf_life_data@{ shape: rectangle, label: "USDA Shelf-Life Catalog" }
  BrokerLogistics_toolsRecall_checker@{ shape: rectangle, label: "Food Safety Recall Guardrail" }
  Openfda@{ shape: rectangle, label: "openFDA Food Safety API" }
  BrokerLogistics_toolsMatcher@{ shape: rectangle, label: "Constraint Filter & Tie-Breaker" }
  BrokerBigqueryVector_index@{ shape: rectangle, label: "BigQuery Vector Search Engine" }
  BrokerBigqueryRecipients_data@{ shape: rectangle, label: "Recipients & Capacities Table" }
  BrokerBigqueryTract_demographics@{ shape: rectangle, label: "Census Tract Demographics" }
  BrokerLogistics_toolsTraffic_router@{ shape: rectangle, label: "Chicago Traffic & Route Router" }
  Chicago_traffic@{ shape: rectangle, label: "City of Chicago Traffic Tracker" }
  BrokerAgent_engineBroker_agent@{ shape: rectangle, label: "Surplus Broker Root Agent" }
  Gemini@{ shape: rectangle, label: "Google Gemini (Vertex AI)" }
  BrokerLogistics_toolsCascading_dispatcher@{ shape: rectangle, label: "Cascading Dispatch Engine" }
  Donor -. "\`1. Submits 10 crates spinach with 6-hour deadline\`" .-> BrokerWeb_ui
  BrokerWeb_ui -. "\`2. POST /api/match\`" .-> BrokerApi_backend
  BrokerApi_backend -. "\`3. Calculate effective shelf-life window\`" .-> BrokerLogistics_toolsClock_calc
  BrokerLogistics_toolsClock_calc -. "\`4. Lookup spinach USDA shelf life\`" .-> BrokerBigqueryShelf_life_data
  BrokerApi_backend -. "\`5. Screen for active FDA recalls\`" .-> BrokerLogistics_toolsRecall_checker
  BrokerLogistics_toolsRecall_checker -. "\`6. Query food recall API\`" .-> Openfda
  BrokerApi_backend -. "\`7. Find and rank qualified pantries\`" .-> BrokerLogistics_toolsMatcher
  BrokerLogistics_toolsMatcher -. "\`8. Run VECTOR_SEARCH on profile text\`" .-> BrokerBigqueryVector_index
  BrokerLogistics_toolsMatcher -. "\`9. Check cold storage & capacity\`" .-> BrokerBigqueryRecipients_data
  BrokerLogistics_toolsMatcher -. "\`10. Hard-filter Greenline decoy (No cold storage)\`" .-> BrokerLogistics_toolsMatcher
  BrokerLogistics_toolsMatcher -. "\`11. Enrich with tract vehicle-insecurity %\`" .-> BrokerBigqueryTract_demographics
  BrokerApi_backend -. "\`12. Compute route driving time and congestion delay\`" .-> BrokerLogistics_toolsTraffic_router
  BrokerLogistics_toolsTraffic_router -. "\`13. Query Chicago live traffic speeds\`" .-> Chicago_traffic
  BrokerApi_backend -. "\`14. Synthesize 7-Part Match Brief\`" .-> BrokerAgent_engineBroker_agent
  BrokerAgent_engineBroker_agent -. "\`15. Generate reasoned explanation and driver SMS\`" .-> Gemini
  BrokerApi_backend -. "\`16. Render Match Card, Leaflet Map pins, and Decoy explanation\`" .-> BrokerWeb_ui
  Coordinator -. "\`17. Primary pantry declines offer: clicks [They said no]\`" .-> BrokerWeb_ui
  BrokerWeb_ui -. "\`18. POST /api/dispatch-fallback\`" .-> BrokerApi_backend
  BrokerApi_backend -. "\`19. Promote Backup #2 to primary\`" .-> BrokerLogistics_toolsCascading_dispatcher
  BrokerApi_backend -. "\`20. Instant re-dispatch with updated SMS alert\`" .-> BrokerWeb_ui
`;case`pantry-onboarding-flow`:return`---
title: "Dynamic Flow — Conversational Pantry Intake & Onboarding"
---
graph LR
  Pantry@{ icon: "fa:user", shape: rounded, label: "Pantry Volunteer" }
  BrokerWeb_ui@{ shape: rectangle, label: "RescueDispatch Web Console" }
  BrokerApi_backend@{ shape: rectangle, label: "FastAPI Dispatch Service" }
  BrokerAgent_engineIntake_agent@{ shape: rectangle, label: "Conversational Pantry Intake Agent" }
  Gemini@{ shape: rectangle, label: "Google Gemini (Vertex AI)" }
  BrokerBigqueryRecipients_data@{ shape: rectangle, label: "Recipients & Capacities Table" }
  Pantry -. "\`1. Enters pantry details in conversational onboarding modal\`" .-> BrokerWeb_ui
  BrokerWeb_ui -. "\`2. POST /api/intake\`" .-> BrokerApi_backend
  BrokerApi_backend -. "\`3. Forward transcript to intake subagent\`" .-> BrokerAgent_engineIntake_agent
  BrokerAgent_engineIntake_agent -. "\`4. Extract structured capacity schema & synthesize profile\`" .-> Gemini
  BrokerAgent_engineIntake_agent -. "\`5. Generate vector embeddings\`" .-> Gemini
  BrokerAgent_engineIntake_agent -. "\`6. Insert new recipient row with embeddings\`" .-> BrokerBigqueryRecipients_data
  BrokerApi_backend -. "\`7. Confirmation: Pantry is now live and searchable!\`" .-> BrokerWeb_ui
`;case`production`:return`---
title: "Deployment Diagram — Google Cloud Platform Production"
---
graph TB
  Gcp@{ shape: rectangle, label: "Google Cloud Platform (qwiklabs-gcp-04-300332596f08)" }
  Devices@{ shape: rectangle, label: "End User Devices" }
`;default:throw Error(`Unknown viewId: `+e)}};export{e as mmdSource};
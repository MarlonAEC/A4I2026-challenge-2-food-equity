var e=e=>{switch(e){case`index`:return`direction: down

Donor: {
  label: "Food Donor"
  shape: c4-person
}
Coordinator: {
  label: "Rescue Coordinator"
  shape: c4-person
}
Pantry: {
  label: "Pantry Volunteer"
  shape: c4-person
}
Driver: {
  label: "Delivery Driver"
  shape: c4-person
}
Broker: {
  label: "Food Equity & Surplus Broker"
}
Gemini: {
  label: "Google Gemini (Vertex AI)"
}
Openfda: {
  label: "openFDA Food Safety API"
}
Chicago-traffic: {
  label: "City of Chicago Traffic Tracker"
}
Osm-tiles: {
  label: "OpenStreetMap Tile Service"
}

Donor -> Broker: "Submits surplus offer with deadline clock"
Coordinator -> Broker: "Reviews match brief, inspects decoys, and triggers dispatches"
Pantry -> Broker: "Onboards new pantry via conversational interview"
Driver -> Broker: "Receives turn-by-turn routing and pickup alerts"
Broker -> Gemini: "[...]"
Broker -> Openfda: "Screens food description for active recalls"
Broker -> Chicago-traffic: "Retrieves live street congestion speeds"
Broker -> Osm-tiles: "Fetches Chicago map tiles"
`;case`containers`:return`direction: down

Donor: {
  label: "Food Donor"
  shape: c4-person
}
Coordinator: {
  label: "Rescue Coordinator"
  shape: c4-person
}
Pantry: {
  label: "Pantry Volunteer"
  shape: c4-person
}
Driver: {
  label: "Delivery Driver"
  shape: c4-person
}
Broker: {
  label: "Food Equity & Surplus Broker"

  Web-ui: {
    label: "RescueDispatch Web Console"
  }
  Api-backend: {
    label: "FastAPI Dispatch Service"
  }
  Agent-engine: {
    label: "ADK Agent Reasoning Engine"
  }
  Logistics-tools: {
    label: "Uber Logistics Tool Suite"
  }
  Mcp-toolbox: {
    label: "MCP Database Toolbox"
  }
  Bigquery: {
    label: "BigQuery Warehouse & Vector Store"
    shape: stored_data
  }
}
Osm-tiles: {
  label: "OpenStreetMap Tile Service"
}
Gemini: {
  label: "Google Gemini (Vertex AI)"
}
Openfda: {
  label: "openFDA Food Safety API"
}
Chicago-traffic: {
  label: "City of Chicago Traffic Tracker"
}

Donor -> Broker.Web-ui: "Submits surplus offer with deadline clock"
Coordinator -> Broker.Web-ui: "Reviews match brief, inspects decoys, and triggers dispatches"
Pantry -> Broker.Web-ui: "Onboards new pantry via conversational interview"
Driver -> Broker.Web-ui: "Receives turn-by-turn routing and pickup alerts"
Broker.Web-ui -> Broker.Api-backend: "Sends match, cascade, and intake requests"
Broker.Api-backend -> Broker.Agent-engine: "Dispatches coordinator queries and briefs"
Broker.Api-backend -> Broker.Logistics-tools: "Executes deterministic matching, clocks, and traffic tools"
Broker.Api-backend -> Broker.Bigquery: "Queries demographic baselines and audits"
Broker.Agent-engine -> Broker.Logistics-tools: "Calls logistics and safety tools"
Broker.Agent-engine -> Broker.Mcp-toolbox: "Executes ad-hoc queries via MCP protocol"
Broker.Agent-engine -> Broker.Bigquery: "Inserts new recipient record with embeddings"
Broker.Logistics-tools -> Broker.Bigquery: "[...]"
Broker.Mcp-toolbox -> Broker.Bigquery: "Introspects tables and runs ad-hoc SQL"
Broker.Web-ui -> Osm-tiles: "Fetches Chicago map tiles"
Broker.Agent-engine -> Gemini: "[...]"
Broker.Logistics-tools -> Openfda: "Screens food description for active recalls"
Broker.Logistics-tools -> Chicago-traffic: "Retrieves live street congestion speeds"
`;case`logistics`:return`direction: right

BrokerLogistics-tools: {
  label: "Uber Logistics Tool Suite"

  Clock-calc: {
    label: "Shelf-Life Clock Calculator"
  }
  Matcher: {
    label: "Constraint Filter & Tie-Breaker"
  }
  Cascading-dispatcher: {
    label: "Cascading Dispatch Engine"
  }
  Load-splitter: {
    label: "Multi-Pantry Bulk Partitioning"
  }
  Recall-checker: {
    label: "Food Safety Recall Guardrail"
  }
  Traffic-router: {
    label: "Chicago Traffic & Route Router"
  }
  Equity-auditor: {
    label: "Spatial Equity Auditor"
  }
}
Openfda: {
  label: "openFDA Food Safety API"
}
Chicago-traffic: {
  label: "City of Chicago Traffic Tracker"
}
BrokerBigquery: {
  label: "BigQuery Warehouse & Vector Store"
  shape: stored_data
}

BrokerLogistics-tools.Clock-calc -> BrokerBigquery: "Reads shelf-life reference hours"
BrokerLogistics-tools.Matcher -> BrokerBigquery: "[...]"
BrokerLogistics-tools.Recall-checker -> Openfda: "Screens food description for active recalls"
BrokerLogistics-tools.Traffic-router -> Chicago-traffic: "Retrieves live street congestion speeds"
BrokerLogistics-tools.Equity-auditor -> BrokerBigquery: "Audits spatial distribution and gaps"
`;case`data-layer`:return`direction: down

BrokerAgent-engine: {
  label: "ADK Agent Reasoning Engine"
}
BrokerLogistics-tools: {
  label: "Uber Logistics Tool Suite"
}
BrokerBigquery: {
  label: "BigQuery Warehouse & Vector Store"
  shape: stored_data

  Recipients-data: {
    label: "Recipients & Capacities Table"
  }
  Shelf-life-data: {
    label: "USDA Shelf-Life Catalog"
  }
  Tract-demographics: {
    label: "Census Tract Demographics"
  }
  Vector-index: {
    label: "BigQuery Vector Search Engine"
  }
  Rescue-deserts: {
    label: "Rescue Deserts Spatial View"
  }
}

BrokerAgent-engine -> BrokerBigquery.Recipients-data: "Inserts new recipient record with embeddings"
BrokerLogistics-tools -> BrokerBigquery.Recipients-data: "Filters by cold storage & capacity"
BrokerLogistics-tools -> BrokerBigquery.Shelf-life-data: "Reads shelf-life reference hours"
BrokerLogistics-tools -> BrokerBigquery.Tract-demographics: "Enriches with poverty & vehicle stats"
BrokerLogistics-tools -> BrokerBigquery.Vector-index: "Runs VECTOR_SEARCH on donor description"
BrokerLogistics-tools -> BrokerBigquery.Rescue-deserts: "Audits spatial distribution and gaps"
`;case`spinach-rescue-flow`:return`direction: right

Donor: {
  label: "Food Donor"
  shape: c4-person
}
Coordinator: {
  label: "Rescue Coordinator"
  shape: c4-person
}
BrokerWeb-ui: {
  label: "RescueDispatch Web Console"
}
BrokerApi-backend: {
  label: "FastAPI Dispatch Service"
}
BrokerLogistics-toolsClock-calc: {
  label: "Shelf-Life Clock Calculator"
}
BrokerBigqueryShelf-life-data: {
  label: "USDA Shelf-Life Catalog"
}
BrokerLogistics-toolsRecall-checker: {
  label: "Food Safety Recall Guardrail"
}
Openfda: {
  label: "openFDA Food Safety API"
}
BrokerLogistics-toolsMatcher: {
  label: "Constraint Filter & Tie-Breaker"
}
BrokerBigqueryVector-index: {
  label: "BigQuery Vector Search Engine"
}
BrokerBigqueryRecipients-data: {
  label: "Recipients & Capacities Table"
}
BrokerBigqueryTract-demographics: {
  label: "Census Tract Demographics"
}
BrokerLogistics-toolsTraffic-router: {
  label: "Chicago Traffic & Route Router"
}
Chicago-traffic: {
  label: "City of Chicago Traffic Tracker"
}
BrokerAgent-engineBroker-agent: {
  label: "Surplus Broker Root Agent"
}
Gemini: {
  label: "Google Gemini (Vertex AI)"
}
BrokerLogistics-toolsCascading-dispatcher: {
  label: "Cascading Dispatch Engine"
}

Donor -> BrokerWeb-ui: "1. Submits 10 crates spinach with 6-hour deadline"
BrokerWeb-ui -> BrokerApi-backend: "2. POST /api/match"
BrokerApi-backend -> BrokerLogistics-toolsClock-calc: "3. Calculate effective shelf-life window"
BrokerLogistics-toolsClock-calc -> BrokerBigqueryShelf-life-data: "4. Lookup spinach USDA shelf life"
BrokerApi-backend -> BrokerLogistics-toolsRecall-checker: "5. Screen for active FDA recalls"
BrokerLogistics-toolsRecall-checker -> Openfda: "6. Query food recall API"
BrokerApi-backend -> BrokerLogistics-toolsMatcher: "7. Find and rank qualified pantries"
BrokerLogistics-toolsMatcher -> BrokerBigqueryVector-index: "8. Run VECTOR_SEARCH on profile text"
BrokerLogistics-toolsMatcher -> BrokerBigqueryRecipients-data: "9. Check cold storage & capacity"
BrokerLogistics-toolsMatcher -> BrokerLogistics-toolsMatcher: "10. Hard-filter Greenline decoy (No cold storage)"
BrokerLogistics-toolsMatcher -> BrokerBigqueryTract-demographics: "11. Enrich with tract vehicle-insecurity %"
BrokerApi-backend -> BrokerLogistics-toolsTraffic-router: "12. Compute route driving time and congestion delay"
BrokerLogistics-toolsTraffic-router -> Chicago-traffic: "13. Query Chicago live traffic speeds"
BrokerApi-backend -> BrokerAgent-engineBroker-agent: "14. Synthesize 7-Part Match Brief"
BrokerAgent-engineBroker-agent -> Gemini: "15. Generate reasoned explanation and driver SMS"
BrokerApi-backend -> BrokerWeb-ui: "16. Render Match Card, Leaflet Map pins, and Decoy explanation"
Coordinator -> BrokerWeb-ui: "17. Primary pantry declines offer: clicks [They said no]"
BrokerWeb-ui -> BrokerApi-backend: "18. POST /api/dispatch-fallback"
BrokerApi-backend -> BrokerLogistics-toolsCascading-dispatcher: "19. Promote Backup #2 to primary"
BrokerApi-backend -> BrokerWeb-ui: "20. Instant re-dispatch with updated SMS alert"
`;case`pantry-onboarding-flow`:return`direction: right

Pantry: {
  label: "Pantry Volunteer"
  shape: c4-person
}
BrokerWeb-ui: {
  label: "RescueDispatch Web Console"
}
BrokerApi-backend: {
  label: "FastAPI Dispatch Service"
}
BrokerAgent-engineIntake-agent: {
  label: "Conversational Pantry Intake Agent"
}
Gemini: {
  label: "Google Gemini (Vertex AI)"
}
BrokerBigqueryRecipients-data: {
  label: "Recipients & Capacities Table"
}

Pantry -> BrokerWeb-ui: "1. Enters pantry details in conversational onboarding modal"
BrokerWeb-ui -> BrokerApi-backend: "2. POST /api/intake"
BrokerApi-backend -> BrokerAgent-engineIntake-agent: "3. Forward transcript to intake subagent"
BrokerAgent-engineIntake-agent -> Gemini: "4. Extract structured capacity schema & synthesize profile"
BrokerAgent-engineIntake-agent -> Gemini: "5. Generate vector embeddings"
BrokerAgent-engineIntake-agent -> BrokerBigqueryRecipients-data: "6. Insert new recipient row with embeddings"
BrokerApi-backend -> BrokerWeb-ui: "7. Confirmation: Pantry is now live and searchable!"
`;case`production`:return`direction: down

Gcp: {
  label: "Google Cloud Platform (qwiklabs-gcp-04-300332596f08)"
}
Devices: {
  label: "End User Devices"
}
`;default:throw Error(`Unknown viewId: `+e)}};export{e as d2Source};
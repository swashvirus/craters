export class Component {
  [key: string]: any;
  constructor(components: {
    [key: string]: any
  }) {
    Array.from(Object.keys((this.constructor as any).schema))
      .forEach((key: string) => {
        if (components.hasOwnProperty(key))
          this[key] = components[key];
      });
  };
};
export class ComponentManager {
  public components: Map < Component, Component > ;
  constructor() {
    this.components = new Map();
  };
};
export class Entity {
  static schema: {
    [key: string]: any;
  };
  public componentManager: ComponentManager;
  constructor() {
    this.componentManager = new ComponentManager();
  };
};
export class EntityManager {
  public entities: Set < Entity > ;
  constructor() {
    this.entities = new Set();
  };
};
export class Query {
  public componentManager: ComponentManager;
  public entityManager: EntityManager;
  constructor() {
    this.componentManager = new ComponentManager();
    this.entityManager = new EntityManager();
  };
};
export class QueryManager {
  public queries: Map < any, any > // Query fix before commit
    constructor() {
      this.queries = new Map();
    };
};
export class System {
  static queryManager: QueryManager = new QueryManager();
  public queryManager: QueryManager;
  public constructor() {
    this.queryManager = new QueryManager();
  };
  public execute(): void {};
};
export class SystemManager {
  public systems: Set < System > ;
  constructor() {
    this.systems = new Set();
  };
};
export class World {
  public systemManager: SystemManager;
  public entityManager: EntityManager;
  public componentManager: ComponentManager;
  constructor() {
    this.systemManager = new SystemManager();
    this.entityManager = new EntityManager();
    this.componentManager = new ComponentManager();
  };
  public registerEntity(entity: Entity): void {
    this.systemManager.systems.forEach((system: System) => {
      Array.from((system.constructor as unknown as System).queryManager.queries.keys())
        .forEach((query: Query) => {
          Array.from(system.queryManager.queries.get(query).componentManager.components.keys()).forEach((component) => {
            if (entity.componentManager.components.has(component))
              if (system.queryManager.queries.get(query).entityManager.entities.has(entity) === false)
                system.queryManager.queries.get(query).entityManager.entities.add(entity);
          });
        });
    });
  }
  public unregisterEntity(entity: Entity): void {
    this.systemManager.systems.forEach((system: System) => {
      Array.from((system.constructor as unknown as System).queryManager.queries.keys())
        .forEach((query: Query) => {
          Array.from(system.queryManager.queries.get(query).componentManager.components.keys()).forEach((component) => {
            if (entity.componentManager.components.has(component))
              if (system.queryManager.queries.get(query).entityManager.entities.has(entity) === true)
                system.queryManager.queries.get(query).entityManager.entities.delete(entity);
          });
        });
    });
  }
  public execute(): void {
    this.systemManager.systems.forEach((system: System) => {
      system.execute();
    });
  }
};
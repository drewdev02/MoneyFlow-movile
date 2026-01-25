---
name: compound-components
title: Crear Componentes Usando Compound Components Pattern (MobX + DI + useInjection)
description: Permitir la creación de componentes compuestos en React/MobX donde la lógica y el estado central viven en un ViewModel inyectado por DI mediante el hook useInjection.
---



## Skill: compound-components-pattern

**Base directory**: /Users/Andrew/WorkSpace/adrewdev/MoneyFlow/.opencode/skills/compound-components-pattern

# Crear Componentes Usando Compound Components Pattern (MobX + DI + useInjection)

## Propósito
Permitir la creación de componentes compuestos en React/MobX donde la lógica y el estado central viven en un ViewModel inyectado por DI mediante el hook `useInjection`. Tanto el componente padre como los subcomponentes obtienen el mismo ViewModel automáticamente y desacoplado, igual que en el resto de tus pantallas.

## Cuándo Usar
- Componentes con partes relacionadas (Tabs, Accordion, Form, etc) que deben compartir estado/lógica, evitando Context y prop drilling.
- Cuando en el proyecto se usa inyección de dependencias y patrones tipo hook (`useInjection`) para ViewModels.
- Cuando se busca una API declarativa, coherente y fácilmente testeable.

## Proceso Paso a Paso
1. **Registra el ViewModel como singleton/scopado en tu container**
   - Por ejemplo: `container.register(TabsViewModel, ...)`.
2. **El componente padre obtiene el ViewModel con el hook useInjection**
   - Ejemplo: `const vm = useInjection(TabsViewModel);`
3. **Los Compound Components (hijos) también obtienen el ViewModel con useInjection**
   - Ejemplo: `const vm = useInjection(TabsViewModel);`
   - No requiere pasar el ViewModel por props.
4. **Haz los subcomponentes accesibles vía propiedad estática del padre**
   - Por ejemplo: `Tabs.List = List;`.
5. **Marca padre e hijos como `observer` para reactividad MobX**
6. **La API es compacta/declarativa**
   - `<Tabs><Tabs.List/><Tabs.Panel when={0}/></Tabs>`
   - Los hijos usan siempre el mismo ViewModel del parent DI.
7. **Valida el ciclo de vida (opcional)**
   - El hook y container deben asegurar que el VM vive el tiempo requerido/alcance adecuado.
8. **Agrega ejemplos y docs**

## Ejemplo Simplificado: Tabs con useInjection

```tsx
// TabsViewModel.ts
import { makeAutoObservable } from 'mobx';

export class TabsViewModel {
  index = 0;
  constructor(defaultIndex = 0) {
    this.index = defaultIndex;
    makeAutoObservable(this);
  }
  setIndex(idx) { this.index = idx; }
}
```

```tsx
// Tabs.tsx
import React from 'react';
import { observer } from 'mobx-react-lite';
import { useInjection } from '@/shared/hooks/use-injection';
import { TabsViewModel } from './TabsViewModel';

export const Tabs = observer(({ children }) => {
  // Usa el hook para obtener la instancia
  const vm = useInjection(TabsViewModel);
  // No es necesario pasar vm explícito a los hijos
  return <div>{children}</div>;
});

const List = observer(({ children }) => {
  const vm = useInjection(TabsViewModel);
  return (
    <div>
      {React.Children.map(children, (child, i) =>
        React.cloneElement(child, {
          selected: vm.index === i,
          onClick: () => vm.setIndex(i)
        })
      )}
    </div>
  );
});

const Panel = observer(({ when, children }) => {
  const vm = useInjection(TabsViewModel);
  return vm.index === when ? <div>{children}</div> : null;
});

Tabs.List = List;
Tabs.Panel = Panel;

// Uso ejemplo:
// <Tabs>
//   <Tabs.List>
//     <button>Tab1</button>
//     <button>Tab2</button>
//   </Tabs.List>
//   <Tabs.Panel when={0}>Contenido 1</Tabs.Panel>
//   <Tabs.Panel when={1}>Contenido 2</Tabs.Panel>
// </Tabs>
```

## Checklist de Verificación
- [ ] El ViewModel está correctamente registrado en el container
- [ ] Todos los Compound Components (hijos) usan `useInjection` para obtener el ViewModel
- [ ] Todos los componentes relevantes son `observer`
- [ ] La API es declarativa y consistente
- [ ] Hay tests para el ciclo de vida/alcance del ViewModel
- [ ] Documentación clara de patrón y ciclo de uso

## Buenas Prácticas y Advertencias
- Usa siempre el hook useInjection en vez de llamar al container directamente
- Si hay más de un Tabs en la página, cada uno debe tener su ViewModel aislado por scope/configuración del container
- Evita state global accidental (cada instancia debe estar correctamente gestionada por el container/hook)
- Limpia y desregistra el ViewModel según el ciclo de vida del componentes si es necesario

---

**Fin del skill para Compound Components Pattern con MobX, DI y useInjection**

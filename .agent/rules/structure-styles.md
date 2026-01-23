---
trigger: always_on
description: aplicar para acomodar los nuevos archivos creados
---

Estructura recomendada para React Native usando arquitectura modular, MVVM, MobX como gestor de estado y InversifyJS para inyección de dependencias.

La idea clave es: cada módulo es autosuficiente (UI + lógica + dominio + datos) y todo se conecta vía interfaces + DI.

⸻

📁 Estructura general

src/
├── app/
│   ├── di/
│   │   ├── container.ts
│   │   ├── types.ts
│   │   └── bindings.ts
│   ├── navigation/
│   │   └── AppNavigator.tsx
│   ├── store/
│   │   └── RootStore.ts
│   └── App.tsx
│
├── modules/
│   ├── auth/
│   │   ├── domain/
│   │   │   ├── models/
│   │   │   │   └── User.ts
│   │   │   ├── repositories/
│   │   │   │   └── AuthRepository.ts
│   │   │   └── usecases/
│   │   │       └── LoginUseCase.ts
│   │   │
│   │   ├── data/
│   │   │   ├── api/
│   │   │   │   └── AuthApi.ts
│   │   │   ├── repositories/
│   │   │   │   └── AuthRepositoryImpl.ts
│   │   │   └── mappers/
│   │   │       └── AuthMapper.ts
│   │   │
│   │   ├── presentation/
│   │   │   ├── screens/
│   │   │   │   └── LoginScreen.tsx
│   │   │   ├── components/
│   │   │   │   └── LoginForm.tsx
│   │   │   └── viewmodels/
│   │   │       └── LoginViewModel.ts
│   │
│   ├── payments/
│   │   └── ...
│   └── profile/
│       └── ...
│
├── shared/
│   ├── ui/
│   │   └── Button.tsx
│   ├── hooks/
│   ├── utils/
│   ├── services/
│   │   └── HttpClient.ts
│   └── types/
│
└── index.tsx


⸻

🧠 Capas y responsabilidades

1. domain

Independiente de React Native y librerías.

domain/
├── models/        → Entidades
├── repositories/  → Interfaces (contratos)
└── usecases/      → Casos de uso

Ejemplo:

export abstract class AuthRepository {
  login(email: string, password: string): Promise<User>;
}


⸻

2. data

Implementación concreta del dominio.

data/
├── api/           → llamadas HTTP
├── repositories/  → implementaciones
└── mappers/       → DTO ↔ dominio

export class AuthRepositoryImpl extends AuthRepository {
  constructor(private api: AuthApi) {}

  login(email: string, password: string) {
    return this.api.login(email, password);
  }
}


⸻

3. presentation (MVVM + MobX)

presentation/
├── screens/       → Pantallas
├── components/    → UI reutilizable
└── viewmodels/    → Estado + lógica

ViewModel (MobX):

export class LoginViewModel {
  email = '';
  loading = false;

  constructor(
    private loginUseCase: LoginUseCase
  ) {
    makeAutoObservable(this);
  }

  async login() {
    this.loading = true;
    await this.loginUseCase.execute(this.email);
    this.loading = false;
  }
}

Screen:

const vm = useInjection(LoginViewModel);

return <LoginForm loading={vm.loading} onSubmit={vm.login} />;


⸻

🔌 Inversify (DI)

core/di/container.ts

export const container = new Container({ defaultScope: 'Singleton' });


container.bind<AuthRepository>(AuthRepository)
  .toResolvedValue(() => new AuthRepositoryImpl());// en caso que tenga depencias lo agregas aqui usando container.get()

container.bind<LoginUseCase>(LoginUseCase)
  .toResolvedValue(() => new LoginUseCase());

container.bind<LoginViewModel>(LoginViewModel)
  .toResolvedValue(() => new LoginViewModel());



⸻

📦 RootStore (opcional)

Si necesitas coordinar ViewModels globales:

export class RootStore {
  auth: LoginViewModel;
}


⸻

✅ Ventajas de esta estructura
	•	Alta escalabilidad
	•	Módulos desacoplados
	•	Testeable (ViewModel y UseCases sin UI)
	•	DI clara y centralizada
	•	MobX limitado a la capa de presentación

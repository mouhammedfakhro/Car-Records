'use client';

interface ChargeState {
  battery_level: number;
  battery_range: number;
  charging_state: string;
  charge_limit_soc: number;
  charge_rate: number;
  time_to_full_charge: number;
}

interface ClimateState {
  inside_temp: number;
  outside_temp: number;
  is_climate_on: boolean;
  driver_temp_setting: number;
}

interface VehicleState {
  odometer: number;
  locked: boolean;
  sentry_mode: boolean;
  car_version: string;
}

interface VehicleDataProps {
  response: {
    vin: string;
    state: string;
    charge_state: ChargeState;
    climate_state: ClimateState;
    vehicle_state: VehicleState;
    vehicle_config: {
      car_type: string;
      exterior_color: string;
    };
  };
}

export default function VehicleData({ response }: VehicleDataProps) {
  const { charge_state, climate_state, vehicle_state, vehicle_config, state } = response;

  // Convert miles to km
  const milesToKm = (miles: number) => (miles * 1.60934).toFixed(0);
  const batteryRangeKm = milesToKm(charge_state.battery_range);
  const odometerKm = milesToKm(vehicle_state.odometer);

  return (
    <div className="w-full max-w-2xl mx-auto p-4 space-y-4">
      {/* Status Header */}
      <div className="bg-gradient-to-r from-red-600 to-red-500 rounded-2xl p-6 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Tesla Model Y</h2>
            <p className="text-red-100 text-sm mt-1">{vehicle_config.exterior_color}</p>
          </div>
          <div className="text-right">
            <div className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
              state === 'online' ? 'bg-green-400 text-green-900' : 'bg-gray-400 text-gray-900'
            }`}>
              {state === 'online' ? '🟢 Online' : '⚫ Offline'}
            </div>
            <p className="text-red-100 text-sm mt-2">
              {vehicle_state.locked ? '🔒 Låst' : '🔓 Olåst'}
            </p>
          </div>
        </div>
      </div>

      {/* Battery Status */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-zinc-800">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">🔋 Batteri</h3>
          <span className="text-3xl font-bold text-green-600">{charge_state.battery_level}%</span>
        </div>

        {/* Battery Bar */}
        <div className="w-full bg-gray-200 dark:bg-zinc-800 rounded-full h-4 mb-4 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              charge_state.battery_level > 50 ? 'bg-green-500' :
              charge_state.battery_level > 20 ? 'bg-yellow-500' : 'bg-red-500'
            }`}
            style={{ width: `${charge_state.battery_level}%` }}
          />
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-500 dark:text-gray-400">Räckvidd</p>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              {batteryRangeKm} km
            </p>
          </div>
          <div>
            <p className="text-gray-500 dark:text-gray-400">Laddningsgräns</p>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              {charge_state.charge_limit_soc}%
            </p>
          </div>
          <div>
            <p className="text-gray-500 dark:text-gray-400">Status</p>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              {charge_state.charging_state === 'Disconnected' ? '⚡ Ej ansluten' :
               charge_state.charging_state === 'Charging' ? '⚡ Laddar' : charge_state.charging_state}
            </p>
          </div>
          {charge_state.charging_state === 'Charging' && (
            <div>
              <p className="text-gray-500 dark:text-gray-400">Tid kvar</p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                {charge_state.time_to_full_charge}h
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Climate */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-zinc-800">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">🌡️ Klimat</h3>
          <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
            climate_state.is_climate_on
              ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
              : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
          }`}>
            {climate_state.is_climate_on ? 'På' : 'Av'}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-500 dark:text-gray-400">Inomhus</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {climate_state.inside_temp.toFixed(1)}°C
            </p>
          </div>
          <div>
            <p className="text-gray-500 dark:text-gray-400">Utomhus</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {climate_state.outside_temp.toFixed(1)}°C
            </p>
          </div>
          <div className="col-span-2">
            <p className="text-gray-500 dark:text-gray-400">Måltemperatur</p>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              {climate_state.driver_temp_setting.toFixed(0)}°C
            </p>
          </div>
        </div>
      </div>

      {/* Vehicle Info */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-zinc-800">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">🚗 Fordon</h3>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-500 dark:text-gray-400">Mätarställning</p>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              {odometerKm.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} km
            </p>
          </div>
          <div>
            <p className="text-gray-500 dark:text-gray-400">Sentry Mode</p>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              {vehicle_state.sentry_mode ? '👁️ På' : '👁️ Av'}
            </p>
          </div>
          <div className="col-span-2">
            <p className="text-gray-500 dark:text-gray-400">Programversion</p>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              {vehicle_state.car_version}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

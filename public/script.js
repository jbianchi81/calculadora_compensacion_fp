function showSubMenu(menuId) {
    document.querySelectorAll('.sub-menu').forEach(menu => {
        if (menu.id === menuId) {
            menu.classList.toggle('show');
        } else {
            menu.classList.remove('show');
        }
    });
}

function loadContent(contentId) {
    document.querySelectorAll('.sub-menu').forEach(menu => {
        menu.classList.remove("show")
    })
    const form_fields = {
        "motores_trifasicos": [

        ],
    };

    document.getElementById("content").innerHTML = `
        <div class="container">
            <h2>Cálculo de Motores Trifásicos</h2>
            <form id="formulario_calculo_compensacion">
                <div class="form-group">
                    <label for="potencia_en_eje">Potencia en el eje</label>
                    <select name="unidades_potencia">
                        <option value="HP">HP</option>
                        <option value="KW">KW</option>
                    </select>
                    <input type="number" name="potencia_en_eje" id="potencia_en_eje" min="0" step="0.01" required>
                </div>
                <div class="form-group">
                    <label for="tension_nominal">Tensión nominal [V]</label>
                    <input type="number" name="tension_nominal" id="tension_nominal" min="0" step="0.01" required>
                </div>
                <div class="form-group">
                    <label for="corriente_nominal">Corriente nominal del motor [A]</label>
                    <input type="number" name="corriente_nominal" id="corriente_nominal" min="0" step="0.01" required>
                </div>
                <div class="form-group">
                    <label for="factor_potencia_deseado">Factor de potencia deseado</label>
                    <input type="number" name="factor_potencia_deseado" id="factor_potencia_deseado" min="0" step="0.01" required>
                </div>
                <div class="form-group">
                    <label for="frecuencia">Frecuencia [Hz]</label>
                    <input type="number" name="frecuencia" id="frecuencia" min="0" required>
                </div>
                <div class="form-group">
                    <label for="factor_potencia_actual">Factor de potencia actual</label>
                    <input type="number" name="factor_potencia_actual" id="factor_potencia_actual" min="0" step="0.01" required>
                </div>
                <div class="form-group">
                    <label></label>
                    <button type="button" onclick="reporte()">Reporte</button>
                </div>
                <label for="capacitor">Capacitor p/cos&phi; deseado [KVAr]:</label>
                <input disabled id="capacitor" name="capacitor">
                <div class="form-group">
                    <button type="button" id="simular" onclick="simular()">Simular</button>
                    <button type="button" id="calcular" onclick="calcular()">Calcular</button>
                </div>
            </form>
        </div>
    `;
}

function reporte() {
    const form = document.getElementById('formulario_calculo_compensacion');
    const formData = new FormData(form);
    const formObject = {};

    formData.forEach((value, key) => {
        formObject[key] = value;
    });
    alert(JSON.stringify(formObject,null,2));
}

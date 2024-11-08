import {Component, forwardRef, Input} from '@angular/core';
import {NG_VALUE_ACCESSOR, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css'
})
export class InputComponent {
  @Input({required: true}) name = '';
  @Input({required: true}) label = '';
  @Input() type = 'text';

  value: any = '';  // Valor interno do input

  // Funções de controle do formulário
  onChange: (value: any) => void = () => {};
  onTouched: () => void = () => {};


  // Implementação do ControlValueAccessor

  writeValue(value: any): void {
    if (value !== undefined) {
      this.value = value;
    }
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setValue(value: any): void {
    this.value = value;
    this.onChange(value);
  }

  onInputChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.setValue(inputElement.value);
  }

  onBlur(): void {
    this.onTouched();
  }
}

package vttp.miniproject.ecommerce.backend.dao;

import lombok.Data;

/*
@Getter
@Setter
@RequiredArgsConstructor
@ToString
@EqualsAndHashCode
 */
@Data
public class PaymentInfo {
    private int amount;
    private String currency;
    private String receiptEmail;
}

import * as generator from "./random_generators.mjs";
import * as test from "./test_funcs.mjs";

const ep = {
  email: generator.generate_string_letters(20) + "@domain.com",
  password: generator.generate_string(20),
};
const staff_factory = () => {
  return {
    name:
      generator.generate_string_letters(generator.generate_int(20)) +
      " " +
      generator.generate_string_letters(generator.generate_int(20)),
    birthday: generator.setBirthday(),
    sex: Boolean(generator.generate_boolean()) ? "Male" : "Female",
    role: generator.generate_string_letters(generator.generate_int(20)),
    phoneNumber: generator.generate_string_numbers(11),
    email: generator.generate_string_letters(20) + "@domain.com",
    //email: ep.email,
    password: generator.generate_string(20),
    //password: ep.password,
  };
};

const customer_factory = () => {
  return {
    name:
      generator.generate_string_letters(generator.generate_int(20)) +
      " " +
      generator.generate_string_letters(generator.generate_int(20)),
    birthday: generator.setBirthday(),
    sex: Boolean(generator.generate_boolean()) ? "Male" : "Female",
    phoneNumber: generator.generate_string_numbers(11),
    email: generator.generate_string_letters(20) + "@domain.com",
    password: generator.generate_string(20),
  };
};

const manager_factory = () => {
  return {
    name:
      generator.generate_string_letters(generator.generate_int(20)) +
      " " +
      generator.generate_string_letters(generator.generate_int(20)),
    birthday: setBirthday(),
    sex: Boolean(generator.generate_boolean()) ? "Male" : "Female",
    role: generator.generate_string_letters(generator.generate_int(20)),
    phoneNumber: generator.generate_string_numbers(11),
    email: generator.generate_string_letters(20) + "@domain.com",
    password: generator.generate_string(20),
  };
};

const product_factory = () => {
  return {
    name:
      generator.generate_string_letters(generator.generate_int(20)) +
      " " +
      generator.generate_string_letters(generator.generate_int(20)) +
      " " +
      generator.generate_string_letters(generator.generate_int(20)) +
      " " +
      generator.generate_string_letters(generator.generate_int(20)),

    description: generator.generate_string_letters(generator.generate_int(20)),
    price: generator.generate_float(10000),
  };
};

const service_factory = () => {
  return {
    name:
      generator.generate_string_letters(generator.generate_int(20)) +
      " " +
      generator.generate_string_letters(generator.generate_int(20)),

    description: generator.generate_string_letters(generator.generate_int(20)),
    price: generator.generate_float(10000),
  };
};

const option_factory = () => {
  return {
    name:
      generator.generate_string_letters(generator.generate_int(20)) +
      " " +
      generator.generate_string_letters(generator.generate_int(20)),

    description: generator.generate_string_letters(generator.generate_int(20)),
    price: generator.generate_float(10000),
    ServiceId: generator.generate_int(20),
  };
};

const contactUs_factory = () => {
  return {
    address:
      generator.generate_string_letters(generator.generate_int(20)) +
      " " +
      generator.generate_string_letters(generator.generate_int(20)),

    phoneNumber: generator.generate_string_numbers(11),
    email: generator.generate_string_letters(20) + "@domain.com",
  };
};

const testimonial_factory = () => {
  return {
    name:
      generator.generate_string_letters(generator.generate_int(20)) +
      " " +
      generator.generate_string_letters(generator.generate_int(20)),

    content: generator.generate_string_letters(generator.generate_int(20)),
    picture: generator.generate_image(),
  };
};

const staffCustomerMessage_factory = () => {
  const id = generator.generate_int(20);
  return {
    StaffId: id,
    CustomerId: id,
    senderIsCustomer: generator.generate_boolean(),

    content: generator.generate_string_letters(generator.generate_int(20)),
    dateSend: generator.generate_date_time(),
    dateReceived: generator.generate_date_time(),
    dateRead: generator.generate_date_time(),
  };
};

const customerServiceOrder_factory = () => {
  return {
    ServiceId: generator.generate_int(20),

    CustomerId: generator.generate_int(20),
    quantity: generator.generate_int(20),
    dateCreated: generator.generate_date_time(),
    dateModified: generator.generate_date_time(),
    dateProcessed: generator.generate_date_time(),
    processed: generator.generate_boolean(),
  };
};

const customerProductOrder_factory = () => {
  const i = generator.generate_int(20);
  return {
    ProductId: i,

    CustomerId: i,
    quantity: generator.generate_int(20),
    dateCreated: generator.generate_date_time(),
    dateModified: generator.generate_date_time(),
    dateProcessed: generator.generate_date_time(),
    processed: generator.generate_boolean(),
  };
};

const cartItem_factory = () => {
  return {
    ProductId: generator.generate_int(20),

    CustomerId: generator.generate_int(20),
    quantity: generator.generate_int(20),
    dateAdded: generator.generate_date_time(),
  };
};

const login_factory = () => {
  return {
    username: "80763871332", //"HQOQROGRGDCFCYHWLNCG@domain.com"generator.generate_string_letters(20),
    password: "My8+Xw0+Ex3\\Gj6(Ik6+", //"Uz4>Qp9!St5]F1-Fu3%H"generator.generate_string(20),
  };
};

const run_test = async (model_factory) => {
  const base_path = `/api/${model_factory.name.split("_")[0]}`;
  const hostname = "localhost";
  const port = 5000;
  test.postMany(
    generator.generate_data(model_factory, 10),
    base_path,
    hostname,
    port
  );
  //test.getAll(base_path, hostname, port);
  //test.deleteOne(generator.generate_int(50), base_path, hostname, port);
  /* test.put(
    generator.generate_int(100),
    generator.generate_data(model_factory, 1)[0],
    base_path,
    hostname,
    port
  ); */
  //test.getOne(generator.generate_int(50), base_path, hostname, port);
};
run_test(staff_factory);
// run_test(customer_factory);
// run_test(service_factory);
// run_test(product_factory);
// run_test(cartItem_factory);
// run_test(customerProductOrder_factory);
// run_test(customerServiceOrder_factory);
// run_test(testimonial_factory);
//run_test(staffCustomerMessage_factory);
//run_test(login_factory);

using System;
using System.Globalization;
using System.Text.Json;
using System.Text.Json.Serialization;

public class DateTimeConverterUsingDateTimeParse : JsonConverter<DateTime?>
{
    private readonly string _format = "yyyy-MM-dd HH:mm:ss";

    public override DateTime? Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
    {
        var value = reader.GetString();
        if (DateTime.TryParseExact(value, _format, CultureInfo.InvariantCulture, DateTimeStyles.None, out var date))
        {
            return date;
        }

        throw new JsonException($"Unable to convert \"{value}\" to DateTime using format \"{_format}\".");
    }

    public override void Write(Utf8JsonWriter writer, DateTime? value, JsonSerializerOptions options)
    {
        writer.WriteStringValue(value?.ToString(_format));
    }
}